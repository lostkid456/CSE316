const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const db = require("../db/connection");

router.route("/check_email/:email").get(function (req, res) {
  let email = req.params["email"].toLowerCase();
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select email from user where email=?",
      email,
      function (err, result) {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/create_user").post(async function (req, res) {
  let data = req.body;
  let u_password = data.password;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(u_password, salt);
  let args = [data.user, data.email, hashed];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into user(username,email,password) values(?,?,?)",
      args,
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/login_user").post(async function (req, res) {
  let data = req.body;
  const pass = data.password;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from user where email=?",
      [data.email],
      (err, user) => {
        connection.release();
        if (err) throw err;
        if (user.length === 0) {
          return res.send(null);
        }
        bcrypt.compare(pass, user[0].password, function (err, result) {
          if (err) throw err;
          if (result) {
            req.session.user = {
              username: user[0].username,
              email: user[0].email,
              authorized: true,
              guest: false,
            };
            res.send(req.session.user);
          } else {
            return res.send(null);
          }
        });
      }
    );
  });
});

router.route("/guest_login").post(async function (req, res) {
  db.getConnection(function (err, connection) {
    connection.release();
    if (err) throw err;
    req.session.user = {
      username: "Guest",
      email: "GUEST",
      authorized: false,
      guest: true,
    };
    res.send(req.session.user);
  });
});

router.route("/validate_user").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    connection.release();
    if (err) throw err;
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      res.send(null);
    }
  });
});

router.route("/user/").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select user.uid,user.username,user.email,user.reputation,user.create_date from user where user.email=?",
      [req.session.user.email],
      function (err, result) {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/user_question/").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select question.qid,question.title,question.text,question.summary,question.views,question.upvote,question.downvote,question.ask_date_time,\
      user.create_date from user inner join qu on user.uid=qu.uid inner join question on qu.qid=question.qid where user.email=?",
      [req.session.user.email],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/user_answer/").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select answer.aid,answer.text,answer.ans_date_time,user.create_date from user inner join au on user.uid=au.uid inner join answer on au.aid=answer.aid \
      where user.email=?",
      [req.session.user.email],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/user_tag/").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select tag.tid,tag.name,user.create_date from user inner join tu on user.uid=tu.uid inner join tag on tu.tid=tag.tid where user.email=?",
      [req.session.user.email],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/questions").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select question.qid,tag.tid as tag_id,tag.name as tag_name,count(qa.aid) as answer_count,question.views,question.upvote,question.downvote,\
      (question.upvote+question.downvote) as total_vote,question.title,question.summary,question.text,user.uid,user.username,user.email,question.ask_date_time \
      from question inner join qt on question.qid=qt.qid inner join tag on tag.tid=qt.tid left join qa on question.qid=qa.qid inner join qu on question.qid=qu.qid\
       inner join user on user.uid=qu.uid group by question.qid,tag.tid,user.username,user.email,user.uid order by question.ask_date_time desc",
      (err, result) => {
        connection.release();
        if (err) throw err;
        let question_map = new Map();
        result.forEach(function (question) {
          if (question_map.get(question.qid)) {
            question_map.get(question.qid).tags.push(question.tag_name);
            question_map.get(question.qid).tagIds.push(question.tag_id);
          } else {
            question_map.set(question.qid, {
              tags: [question.tag_name],
              tagIds: [question.tag_id],
              answer_count: question.answer_count,
              title: question.title,
              summary: question.summary,
              text: question.text,
              ask_date_time: question.ask_date_time,
              username: question.username,
              uid: question.uid,
              upvote: question.upvote,
              downvote: question.downvote,
              total_vote: question.total_vote,
              views: question.views,
            });
          }
        });
        const questions = [];
        question_map.forEach(function (value, key) {
          questions.push({ value, key });
        });
        res.send(questions);
      }
    );
  });
});

router.route("/tags").get(async function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select tag.tid as tag_id,tag.name as tag_name from tag",
      (err, result) => {
        connection.release();
        if (err) throw err;
        let tags = result.map(function (tag) {
          return { tid: tag.tag_id, name: tag.tag_name };
        });
        res.send(tags);
        res.status(200);
      }
    );
  });
});

router.route("/question/:id").get(async function (req, res) {
  let id = req.params.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select question.qid,question.text as question_text,question.title,question.summary,question.views,question.upvote,question.downvote,question.ask_date_time, \
      user.uid,user.username,user.email,comment.text as comment_text,comment.cid,comment.c_date_time,comment.user from user inner join qu on qu.uid=user.uid inner join question \
      on question.qid=qu.qid left join qc on qc.qid=question.qid left join comment on qc.cid=comment.cid where question.qid=? order by question.ask_date_time \
      , comment.c_date_time desc",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        question_comments = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].comment_text) {
            question_comments.push({
              text: result[i].comment_text,
              cid: result[i].cid,
              c_date_time: result[i].c_date_time,
              user: result[i].user,
            });
          } else {
            break;
          }
        }
        res.send({
          qid: result[0].qid,
          title: result[0].title,
          text: result[0].question_text,
          summary: result[0].summary,
          views: result[0].views,
          upvote: result[0].upvote,
          downvote: result[0].downvote,
          ask_date_time: result[0].ask_date_time,
          uid: result[0].uid,
          username: result[0].username,
          email: result[0].email,
          comments: question_comments,
        });
      }
    );
  });
});

router.route("/get_answers/:id").get(async function (req, res) {
  let id = req.params.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select question.qid,user.username,user.email,answer.aid,answer.text as answer_text,answer.ans_date_time from question join \
      qu on qu.qid=question.qid left join qa on qa.qid=question.qid left join answer on qa.aid=answer.aid inner join au on answer.aid=au.aid inner join user on \
      au.uid=user.uid where question.qid=? order by answer.ans_date_time desc",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        let answers = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].aid) {
            answers.push({
              qid: result[i].qid,
              username: result[i].username,
              aid: result[i].aid,
              text: result[i].answer_text,
              ans_date_time: result[i].ans_date_time,
              upvote: result[i].upvote,
              downvote: result[i].downvote,
            });
          }
        }
        res.send({
          answers: answers,
        });
      }
    );
  });
});

router.route("/get_answer_comments/:id").get(async function (req, res) {
  let id = req.params.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select comment.cid,comment.text,comment.c_date_time,comment.user from answer inner join ac on ac.aid=answer.aid inner join comment on ac.cid=comment.cid\
       where answer.aid=?",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        let comments = [];
        for (let i = 0; i < result.length; i++) {
          comments.push(result[i]);
        }
        res.send(comments);
      }
    );
  });
});

router.route("/new_question").post(async function (req, res) {
  let data = req.body;
  let args = [data.title, data.text, data.summary];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into question(title,text,summary) values(?,?,?)",
      args,
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/new_tag").post(async function (req, res) {
  let tag = req.body.tag_name;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into tag(name) values(?)",
      [tag],
      (err, results) => {
        connection.release();
        if (err) throw err;
        res.send(results);
      }
    );
  });
});

router.route("/new_answer").post(async function (req, res) {
  let text = req.body.text;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into answer(text) values(?)",
      [text],
      (err, results) => {
        connection.release();
        if (err) throw err;
        res.send(results);
      }
    );
  });
});

router.route("/new_question_comment").post(async function (req, res) {
  let comment = req.body;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into comment(text,user) values(?,?)",
      [comment.text, comment.user],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/upvote").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update question set upvote=upvote+1 where question.qid=?",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/downvote").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update question set downvote=downvote+1 where question.qid=?",
      [id],
      (err, results) => {
        connection.release();
        if (err) throw err;
        res.send(results);
      }
    );
  });
});

router.route("/increase_rep").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update user set reputation=reputation+5 where user.uid=?",
      [id],
      (err, results) => {
        connection.release();
        if (err) throw err;
        res.send(results);
      }
    );
  });
});

router.route("/decrease_rep").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update user set reputation=reputation-10 where user.uid=?",
      [id],
      (err, results) => {
        connection.release();
        if (err) throw err;
        res.send(results);
      }
    );
  });
});

router.route("/update_view").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update question set views=views+1 where qid=?",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_qt").post(async function (req, res) {
  let data = req.body;
  let args = [data.qid, data.tid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into qt(qid,tid) values(?,?)",
      args,
      function (err, result) {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_tu").post(async function (req, res) {
  let data = req.body;
  let args = [data.tid, data.uid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into tu(tid,uid) values(?,?)",
      args,
      function (err, result) {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_qu").post(async function (req, res) {
  let data = req.body;
  let args = [data.qid, data.uid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into qu(qid,uid) values(?,?)",
      args,
      function (err, result) {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_au").post(async function (req, res) {
  let data = req.body;
  let args = [data.aid, data.uid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into au(aid,uid) values(?,?)",
      args,
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_qa").post(async function (req, res) {
  let data = req.body;
  let args = [data.aid, data.qid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into qa(aid,qid) values(?,?)",
      args,
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_qc").post(async function (req, res) {
  let data = req.body;
  let args = [data.qid, data.cid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into qc(qid,cid) values(?,?)",
      args,
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/update_ac").post(async function (req, res) {
  let data = req.body;
  let args = [data.aid, data.cid];
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into ac(aid,cid) values(?,?)",
      args,
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/editQuestion").post(async function (req, res) {
  let question = req.body;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update question set title=?,text=?,summary=? where question.qid=?",
      [question.title, question.text, question.summary, question.qid],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/deleteQuestion").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "delete from question where question.qid=?",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/editAnswer").post(async function (req, res) {
  let answer = req.body;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update answer set text=? where answer.aid=?",
      [answer.text, answer.aid],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/deleteAnswer").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "delete from answer where answer.aid=?",
      [id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/editTag").post(async function (req, res) {
  let tag = req.body;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "update tag set name=? where tag.tid=?",
      [tag.name, tag.tid],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

router.route("/deleteTag").post(async function (req, res) {
  let id = req.body.id;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("delete from tag where tag.tid=?", [id], (err, result) => {
      connection.release();
      if (err) throw err;
      res.send(result);
    });
  });
});

router.route("/remove_user").post(async function (req, res) {
  db.getConnection(function (err, connection) {
    connection.release();
    if (err) throw err;
    if (req.session.user) {
      req.session.destroy();
    }
    res.send(null);
  });
});

module.exports = router;
