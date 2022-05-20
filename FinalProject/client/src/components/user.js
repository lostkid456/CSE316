import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import AnswerPage from "./answer_page";
import EditAnswerPage from "./editAnswer";
import EditQuestionPage from "./editQuestion";
import EditTagPage from "./editTag";
import Navbar from "./navbar";
import NewAnswerPage from "./new_answer";
import NewAnswerComment from "./new_answer_comment";
import NewQuestion from "./new_question";
import NewQuestionComment from "./new_question_comment";
import Profile from "./profile";
import ProfileAnswer from "./profile_answer";
import ProfileTag from "./profile_tag";
import QuestionPage from "./questions_page";
import SearchPage from "./search_page";
import TagsPage from "./tags_page";

const User = () => {
  const navigate = useNavigate();

  const [errState, setErrState] = useState(false);
  const [err, setErr] = useState("");

  const [page, setPage] = useState("q");

  const [search, setSearch] = useState();

  const [uData, setUdata] = useState([]);
  const [uqData, setUqData] = useState([]);
  const [utData, setUtData] = useState([]);
  const [uaData, setUaData] = useState([]);

  const [tData, setTData] = useState([]);
  const [qData, setQData] = useState([]);

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [aComments, setAComments] = useState([]);

  const [aid, setAid] = useState();

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    api
      .get_user_login()
      .then(function(result) {
        if (!result.data) {
          navigate("/");
        }
      })
      .catch((e) => {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
    api
      .get_question_data()
      .then(function(result) {
        setQData(result.data);
      })
      .catch((e) => {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
    api
      .get_tag_data()
      .then((res) => {
        setTData(res.data);
      })
      .catch((e) => {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
    api
      .get_user_data()
      .then((res) => {
        setUdata(res.data);
      })
      .catch((e) => {});
    api
      .get_user_question()
      .then((res) => {
        setUqData(res.data);
      })
      .catch((e) => {});
    api
      .get_user_answer()
      .then((res) => {
        setUaData(res.data);
      })
      .catch((e) => []);
    api
      .get_user_tag()
      .then((res) => {
        setUtData(res.data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    api
      .get_question_data()
      .then(function(result) {
        setQData(result.data);
      })
      .catch((e) => {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
    api
      .get_tag_data()
      .then((res) => {
        setTData(res.data);
      })
      .catch((e) => {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
    api
      .get_user_data()
      .then((res) => {
        setUdata(res.data);
      })
      .catch((e) => {});
    api
      .get_user_question()
      .then((res) => {
        setUqData(res.data);
      })
      .catch((e) => {});
    api
      .get_user_answer()
      .then((res) => {
        setUaData(res.data);
      })
      .catch((e) => []);
    api
      .get_user_tag()
      .then((res) => {
        setUtData(res.data);
      })
      .catch((e) => {});
    setUpdated(false);
  }, [updated]);

  const sign_out = () => {
    api
      .remove_user()
      .then(function() {
        navigate("/");
      })
      .catch((e) => {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
  };

  const change_page = (page) => {
    setPage(page);
  };

  const querying = (query) => {
    const queries = query.split(" ");
    const results = [];
    const logged = new Map();
    for (let i = 0; i < queries.length; i++) {
      if (results.length === qData.length) {
        break;
      }
      if (queries[i].match(/^\[(.*?)?\]/)) {
        const tag = queries[i]
          .replace("[", "")
          .replace("]", "")
          .toLowerCase();
        for (let j = 0; j < qData.length; j++) {
          for (let k = 0; k < qData[j].value.tags.length; k++) {
            if (qData[j].value.tags[k] === tag && !logged.get(j)) {
              results.push(qData[j]);
              logged.set(j, 1);
            }
          }
        }
      } else {
        for (let j = 0; j < qData.length; j++) {
          let title = qData[j].value.title;
          let text = qData[j].value.text;
          let summary = qData[j].value.summary;
          let re = new RegExp(queries[i], "i");
          if (title.match(re) || text.match(re) || summary.match(re)) {
            if (!logged.get(j)) {
              results.push(qData[j]);
              logged.set(j, 1);
            }
          }
        }
      }
    }
    return results;
  };

  const handleQuery = (query) => {
    let res = querying(query);
    setSearch(res);
    change_page("s");
  };

  const new_question = async () => {
    try {
      let tags = Array.from(
        new Set(
          document
            .getElementById("tag_box")
            .value.trim()
            .toLowerCase()
            .split(" ")
        )
      );
      var tag_ids = [];
      var new_tags = [];
      console.log(tag_ids, tData);
      for (let i = 0; i < tags.length; i++) {
        var counter = 0;
        for (let j = 0; j < tData.length; j++) {
          if (tags[i] === tData[j].name) {
            counter += 1;
            tag_ids.push(tData[j].tid);
            continue;
          }
        }
        if (counter === 0) {
          if (uData[0].reputation < 100) {
            setErr("Reputation Insufficent for Creating Question with New Tag");
            setErrState(true);
            return;
          } else {
            let new_tag_data = await api.add_tag({
              tag_name: tags[i].toLowerCase(),
            });
            tag_ids.push(new_tag_data.data.insertId);
            new_tags.push(new_tag_data.data.insertId);
          }
        }
      }
      console.log(tag_ids);
      let new_question = {
        title: document.getElementById("title_box").value,
        text: document.getElementById("text_box").value,
        summary: document.getElementById("summary_box").value,
      };
      let new_question_data = await api.add_question(new_question);
      for (let i = 0; i < tag_ids.length; i++) {
        let new_qt = { qid: new_question_data.data.insertId, tid: tag_ids[i] };
        await api.update_qt(new_qt);
      }
      for (let i = 0; i < new_tags.length; i++) {
        let new_tu = { tid: new_tags[i], uid: uData[0].uid };
        await api.update_tu(new_tu);
      }
      let new_qu = { qid: new_question_data.data.insertId, uid: uData[0].uid };
      await api.update_qu(new_qu);
      setPage("q");
      setUpdated(true);
    } catch (err) {}
  };

  const handleLink = async (id) => {
    await api.update_view({ id: id });
    let question_data = await api.get_question(id);

    let answer_data = await api.get_answers(id);

    let answer_comments = [];
    for (let i = 0; i < answer_data.data.answers.length; i++) {
      let comments = await api.get_answer_comments(
        answer_data.data.answers[i].aid
      );
      answer_comments.push(comments.data);
    }

    setQuestion(question_data.data);
    setAnswers(answer_data.data);
    setAComments(answer_comments);
    setUpdated(true);
    setPage("a");
  };

  const new_answer = async () => {
    let ans_id = await api.add_answer({
      text: document.getElementById("text_box").value,
    });
    await api.update_qa({ qid: question.qid, aid: ans_id.data.insertId });
    await api.update_au({ aid: ans_id.data.insertId, uid: uData[0].uid });
    let answer_data = await api.get_answers(question.qid);
    setAnswers(answer_data.data);
    setPage("a");
  };

  const upvote = async () => {
    await api.update_upvote({ id: question.qid });
    await api.user_rep_increase({ id: question.uid });
    let question_data = await api.get_question(question.qid);
    setQuestion(question_data.data);
    setPage("a");
    setUpdated(true);
  };
  const downvote = async () => {
    await api.update_downvote({ id: question.qid });
    await api.user_rep_decrease({ id: question.uid });
    let question_data = await api.get_question(question.qid);
    setQuestion(question_data.data);
    setPage("a");
    setUpdated(true);
  };

  const newQuestionComment = () => {
    change_page("nqc");
  };

  const newAnswerComment = (aid) => {
    setAid(aid);
    change_page("nac");
  };

  const CreateQuestionComment = async () => {
    if (uData[0].reputation < 100) {
      setPage("a");
    } else {
      let new_comment = await api.add_question_comment({
        text: document.getElementById("text_box").value,
        user: uData[0].username,
      });
      await api.update_qc({
        qid: question.qid,
        cid: new_comment.data.insertId,
      });
      let question_data = await api.get_question(question.qid);
      setQuestion(question_data.data);

      setPage("a");
    }
  };

  const CreateAnswerComment = async (aid) => {
    if (uData[0].reputation < 100) {
      setPage("a");
    } else {
      let new_comment = await api.add_question_comment({
        text: document.getElementById("text_box").value,
        user: uData[0].username,
      });

      await api.update_ac({ aid: aid, cid: new_comment.data.insertId });
      let answer_data = await api.get_answers(question.qid);
      let answer_comments = [];
      for (let i = 0; i < answer_data.data.answers.length; i++) {
        let comments = await api.get_answer_comments(
          answer_data.data.answers[i].aid
        );
        answer_comments.push(comments.data);
      }
      setAnswers(answer_data.data);
      setAComments(answer_comments);
      setPage("a");
    }
  };

  const profile = () => {
    console.log(uqData);
    console.log(uaData);
    console.log(utData);
    change_page("profile");
  };

  const editQuestion = (id) => {
    setAid(id);
    change_page("edit_question");
  };

  const deleteQuestion = async (id) => {
    await api.deleteQuestion({ id: id });
    setUpdated(true);
    change_page("profile");
  };

  const editAnswer = (id) => {
    setAid(id);
    change_page("edit_answer");
  };

  const deleteAnswer = async (id) => {
    await api.deleteAnswer({ id: id });
    setUpdated(true);
    change_page("profile_answer");
  };

  const editTag = (id) => {
    setAid(id);
    change_page("edit_tag");
  };

  const deleteTag = async (id) => {
    await api.deleteTag({ id: id });
    setUpdated(true);
    change_page("profile_tag");
  };

  const QuestionChange = async (id) => {
    let question = {
      title: document.getElementById("title_box").value,
      text: document.getElementById("text_box").value,
      summary: document.getElementById("summary_box").value,
      qid: id,
    };
    await api.editQuestion(question);
    setUpdated(true);
    change_page("profile_tag");
  };

  const AnswerChange = async (id) => {
    let answer = {
      text: document.getElementById("text_box").value,
      aid: id,
    };
    await api.editAnswer(answer);
    setUpdated(true);
    change_page("profile_tag");
  };

  const TagChange = async (id) => {
    let tag = { name: document.getElementById("text_box").value, tid: id };
    console.log(tag);
    await api.editTag(tag);
    setUpdated(true);
    change_page("profile_tag");
  };

  let render;
  if (page === "q") {
    render = (
      <QuestionPage
        page={page}
        user={uData}
        data={qData}
        changePage={change_page}
        handleLink={handleLink}
      />
    );
  } else if (page === "nq") {
    render = <NewQuestion NewQuestion={new_question} />;
  } else if (page === "t") {
    render = (
      <TagsPage
        tags={tData}
        data={qData}
        page={page}
        user={uData}
        changePage={change_page}
        query={handleQuery}
      />
    );
  } else if (page === "s") {
    render = (
      <SearchPage
        data={search}
        page={page}
        user={uData}
        changePage={change_page}
        handleLink={handleLink}
      />
    );
  } else if (page === "a") {
    render = (
      <AnswerPage
        changePage={change_page}
        newAnswer={change_page}
        page={page}
        user={uData}
        data={question}
        answers={answers}
        answer_comments={aComments}
        upvote={upvote}
        downvote={downvote}
        newQuestionComment={newQuestionComment}
        newAnswerComment={newAnswerComment}
      />
    );
  } else if (page === "na") {
    render = <NewAnswerPage CreateNewAnswer={new_answer} />;
  } else if (page === "nqc") {
    render = (
      <NewQuestionComment CreateNewQuestionComment={CreateQuestionComment} />
    );
  } else if (page === "nac") {
    render = (
      <NewAnswerComment
        CreateNewAnswerComment={CreateAnswerComment}
        aid={aid}
      />
    );
  } else if (page === "profile") {
    render = (
      <Profile
        Questions={uqData}
        Answers={uaData}
        Tags={utData}
        User={uData}
        toQuestion={change_page}
        toAnswer={change_page}
        toTag={change_page}
        editQuestion={editQuestion}
        deleteQuestion={deleteQuestion}
      />
    );
  } else if (page === "profile_tag") {
    render = (
      <ProfileTag
        Questions={uqData}
        Answers={uaData}
        Tags={utData}
        User={uData}
        toQuestion={change_page}
        toAnswer={change_page}
        toTag={change_page}
        editTag={editTag}
        deleteTag={deleteTag}
      />
    );
  } else if (page === "profile_answer") {
    render = (
      <ProfileAnswer
        Questions={uqData}
        Answers={uaData}
        Tags={utData}
        User={uData}
        toQuestion={change_page}
        toAnswer={change_page}
        toTag={change_page}
        editAnswer={editAnswer}
        deleteTag={deleteAnswer}
      />
    );
  } else if (page === "edit_question") {
    render = <EditQuestionPage id={aid} changeQuestion={QuestionChange} />;
  } else if (page === "edit_tag") {
    render = <EditTagPage id={aid} changeTag={TagChange} />;
  } else if (page === "edit_answer") {
    render = <EditAnswerPage id={aid} changeAnswer={AnswerChange} />;
  }
  return (
    <div className="fakestackoverflow">
      <Navbar
        page={page}
        signout={sign_out}
        user={uData}
        changePage={change_page}
        query={handleQuery}
        profile={profile}
      />
      <div className="main">
        <div
          style={{ paddingLeft: "35%", color: "red" }}
          className={errState ? "error_state" : "off_screen"}
        >
          <h2>{err}</h2>
        </div>
        {render}
      </div>
    </div>
  );
};

export default User;
