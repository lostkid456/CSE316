// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

// Imports the Express module
const express = require("express");
const Questions=require("./models/questions");
const Tags=require("./models/tags");
const Answers=require("./models/answers");

// Create the server and set port 8000
const app = express();
const port = 8000;

// cors middleware 
var cors = require("cors");
// Use the cors middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// for routing middleware
app.get('/questions',async function(req,res){
  Questions.find({}).sort([['ask_date_time', 'descending']]).populate('tags').exec(function (err, questions) {
    if (err) {
      console.log('Could not find status: ' + err);
      return;
    }
    questions.map(function (question) {
      return question;
    });
    res.json(questions);
    res.status(200);
  })
})

app.get('/question/:id',async function(req,res){
  let id=req.params["id"];
  Questions.findById(id).populate('answers').exec(function (err, question) {
    if (err) {
      console.log('Could not find status: ' + err);
      return;
    }
    res.json(question);
    res.status(200);
  })
})

app.post('/update_qanswer/',async function(req,res){
  let id=req.body["id"];
  let aid=req.body["aid"];
  console.log(id,aid);
  Questions.findByIdAndUpdate({_id:id},{$push:{answers:aid}}).populate('answers').exec(function(err,question){
    if(err){
      console.log('Could not find status: ' + err);
      return;
    }
    res.json(question);
    res.status(200);
  })
})

app.post('/questionlink/',async function(req,res){
  let id=req.body["id"];
  Questions.findByIdAndUpdate({ _id:id }, { $inc: { views: 1} }).populate('answers').exec(function (err, question) {
    if (err) {
      console.log('Could not find status: ' + err);
      return;
    }
    res.json(question);
    res.status(200);
  })
})

app.get('/tags',async function(req,res){
  Tags.find({}).exec(function (err, tags) {
    if (err) {
      console.log('Could not find status: ' + err);
      return;
    }
    tags.map(function (tag) {
      return tag;
    });
    res.json(tags);
    res.status(200);
  })
})

app.post('/update_questions',async (req,res)=>{
  let data=req.body;
  console.log(data["tags"]);
  let questions=Questions({
    title:data["title"],
    text:data["text"],
    tags:data["tags"],
    answers:data["answers"],
    asked_by:data["asked_by"]
  });
  questions.save(function(err,result){
    if(err){
      console.log("Could not add new question");
      return;
    }
    res.json(result);
  })
})

app.post('/update_tag',async function(req,res){
  let tag=req.body.tag_name;
  console.log(tag)
  let new_tag=new Tags({name:tag});
  new_tag.save(function(err,result){
    if(err){
      console.log("Could not create new tag");
      return;
    }
    res.json(result["_id"]);
  })
})

app.post('/update_answers',async function(req,res){
  let data=req.body;
  let answer=Answers({
    text:data["text"],
    ans_by:data["ans_by"]
  });
  answer.save(function(err,result){
    if(err){
      console.log("Could not add new answer");
      return;
    }
    res.json(answer);
  })
})


// Connect to the MongoDB database
let mongoose = require("mongoose");
const tags = require("./models/tags");
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.on("connected", function () {
  console.log("Connected to database");
});

// Run the server on port 8000
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// When CTRL-C is detected
process.on("SIGINT", () => {
  server.close(() => {
    if (db) {
      db.close()
        .then((result) =>
          console.log("\nServer closed. Database instance disconnected")
        )
        .then((result) => process.exit())
        .catch((err) => console.log(err));
    }
  });
});
