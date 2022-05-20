import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./navbar";
import QuestionPage from "./questions_page";
import SearchPage from "./search_page";
import TagsPage from "./tags_page";
import AnswerPage from "./answer_page";

const Guest = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("q");

  const [search, setSearch] = useState();

  const [tData, setTData] = useState([]);
  const [qData, setQData] = useState();

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [aComments, setAComments] = useState([]);

  const [errState, setErrState] = useState(false);
  const [err, setErr] = useState("");

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
  }, []);

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
      return results;
    }
  };

  const handleQuery = (query) => {
    let res = querying(query);
    setSearch(res);
    change_page("s");
  };

  const sign_in = () => {
    api
      .remove_user()
      .then(function() {
        navigate("/");
      })
      .catch(function(e) {
        setErr("Couldn't communicate with server");
        setErrState(true);
      });
  };

  const change_page = (page) => {
    setPage(page);
  };

  const handleLink = async (id) => {
    let question_data = await api.get_question(id);
    let answer_data = await api.get_answers(id);
    console.log(answer_data);
    let answer_comments = [];
    for (let i = 0; i < answer_data.data.answers.length; i++) {
      let comments = await api.get_answer_comments(
        answer_data.data.answers[i].aid
      );
      answer_comments.push(comments.data);
    }
    console.log(answer_comments);
    setQuestion(question_data.data);
    setAnswers(answer_data.data);
    setAComments(answer_comments);
    setPage("a");
  };

  let render;
  if (page === "q") {
    render = (
      <QuestionPage
        page={page}
        data={qData}
        changePage={change_page}
        handleLink={handleLink}
      />
    );
  } else if (page === "t") {
    render = <TagsPage tags={tData} data={qData} page={page} />;
  } else if (page === "s") {
    render = (
      <SearchPage
        page={page}
        data={search}
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
        data={question}
        answers={answers}
        answer_comments={aComments}
      />
    );
  }

  return (
    <div className="fakestackoverflow">
      <Navbar
        page={page}
        signin={sign_in}
        changePage={change_page}
        query={handleQuery}
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

export default Guest;
