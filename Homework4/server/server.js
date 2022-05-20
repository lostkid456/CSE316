// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

// Imports the Express module
const express = require("express");

// Imports MySQL and the required queries
var mysql = require("mysql");
const Question=require('./db/Question');
const Tag=require('./db/Tag');
const Ans=require('./db/Answer');

// Gets args from command line
let userArgs = process.argv.slice(2);
let user = userArgs[1];
let pass = userArgs[3];

// Create the server and set port 8000
const app = express();
const port = 8000;

// cors middleware
var cors = require("cors");
// Use the cors middleware and other middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Connect to the MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  user: user,
  password: pass,
  database: "fake_so",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

// For routing middleware
app.get('/questions',async function(req,res){
  let question_query=await Question.getQuestions(connection);
  const question_map = new Map();
  question_query.forEach(function (question) {
    if (question_map.get(question.qid))
      question_map.get(question.qid).tags.push(question.tag_name);
    else
      question_map.set(question.qid, {
        tags: [question.tag_name],
        answer_count: question.answer_count,
        title:question.title,
        text:question.text,
        asked_by: question.asked_by,
        ask_date_time: question.ask_date_time,
        views:question.views,
      });
  });
  const questions=[];
  question_map.forEach(function(value,key){
    questions.push({value,key});
  })
  res.send(questions);
})

app.get('/tags',async function(req,res){
  let tag_query=await Tag.getTags(connection);
  let tags=tag_query.map(function(tag){
    return tag.tag_name;
  })
  res.send(tags);
  res.status(200);
})

app.get('/answer/:id',async function(req,res){
  let id=req.params["id"];
  let answer_query=await Ans.getQuestionAnswer(connection,[id]);
  const answers=[];
  answer_query.forEach(function(answer){
    const aid=answer.aid;
    const text=answer.text;
    const ans_by=answer.ans_by;
    const ans_date_time=answer.ans_date_time;
    answers.push({aid,text,ans_by,ans_date_time});
  });
  res.send(answers);
  res.status(200);
})

app.post('/update_question_views/',async function(req,res){
  let id=req.body["id"];
  let query=await Question.updateViewCount(connection,[id]);
  res.send(query);
  res.status(200);
})

app.post('/update_questions',async function(req,res){
    let data=req.body;
    let args=[];
    args.push(data.title,data.text,data.asked_by);
    let resp=await Question.addQuesion(connection,args);
    res.send(resp);
    res.status(200);
})

app.post('/update_tag',async function(req,res){
  let tag=req.body.tag_name;
  let resp=await Tag.createTag(connection,tag);
  res.send(resp);
  res.status(200);
})

app.post('/update_qt',async function(req,res){
  let data=req.body;
  let args=[];
  args.push(data.qstnId,data.tagId);
  let resp=await Question.updateQt(connection,args);
  res.send(resp);
  res.status(200);
})

app.post('/update_answers',async function(req,res){
  let data=req.body;
  let args=[];
  args.push(data.ans_by,data.text);
  let resp=await Ans.addAnswer(connection,args);
  res.send(resp);
  res.status(200);
})

app.post('/update_qa',async function(req,res){
  let data=req.body;
  let args=[];
  args.push(data.qstnId,data.ansId);
  let resp=await Ans.updateQa(connection,args);
  res.send(resp);
  res.status(200);
})

// Run the server on port 8000
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// When CTRL-C is detected
process.on("SIGINT", () => {
  server.close(() => {
    if (connection) {
      connection.end();
      console.log("\nServer closed. Database instance disconnected");
    }
  });
});
