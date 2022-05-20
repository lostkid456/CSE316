import React, { useState } from "react";

const NewQuestion = (props) => {
  const [errors, setErrors] = useState([]);
  const [err, setErr] = useState(false);

  const checkParams = () => {
    const arr = [];
    const title = document.getElementById("title_box").value;
    const summary = document.getElementById("summary_box").value;
    const text = document.getElementById("text_box").value;
    const tags = document.getElementById("tag_box").value;
    if (!title.trim() || title.length === 0) {
      arr.push("Title cannot be empty!");
    }
    if (title.length > 100) {
      arr.push("Title cannot be more than 100 characters!");
    }

    if (summary.length > 140) {
      arr.push("Summary cannot be more than 140 characters");
    }

    if (!text.trim() || text.length === 0) {
      arr.push("Text cannot be empty!");
    }

    if (!tags.trim() || tags.length === 0) {
      arr.push("Tags cannot be empty!");
    }

    return arr;
  };

  const buttonClick = () => {
    let err = checkParams();
    if (err.length === 0) {
      props.NewQuestion();
    } else {
      setErrors(err);
      setErr(true);
    }
  };

  const renderError = () => {
    return errors.map((error) => {
      return (
        <div key={error}>
          <span style={{ color: "red" }}>{error}</span>
        </div>
      );
    });
  };

  return (
    <div className="new_question">
      <div className={err ? "error_state" : "offscreen"}>{renderError()}</div>
      <div className="question_title">
        <h1>Question Title</h1>
        <h2 style={{ fontSize: "medium" }}>
          Title should not be more than 100 characters
        </h2>
        <textarea id="title_box" rows={"2"} cols={"100"}></textarea>
      </div>
      <div className="question_sumamry">
        <h1>Question Summary</h1>
        <h2 style={{ fontSize: "medium" }}>
          Summary should not be more than 140 characters
        </h2>
        <textarea id="summary_box" rows={"5"} cols={"100"}></textarea>
      </div>
      <div className="question_text">
        <h1>Question Text</h1>
        <h2 style={{ fontSize: "medium" }}>Add details</h2>
        <textarea id="text_box" rows={"5"} cols={"100"}></textarea>
      </div>
      <div className="tags">
        <h1>Tags</h1>
        <h2 style={{ fontSize: "medium" }}>
          Add Keywords seperated by whitespace
        </h2>
        <textarea id="tag_box" rows={"2"} cols={"100"}></textarea>
      </div>
      <div>
        <button
          style={{
            height: "50px",
            borderRadius: "10px",
            marginTop: "10px",
            backgroundColor: "#165A92",
            color: "white",
            fontSize: "medium",
          }}
          onClick={buttonClick}
        >
          Post Question
        </button>
      </div>
    </div>
  );
};

export default NewQuestion;
