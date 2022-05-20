import React, { useState } from "react";

const EditQuestionPage = (props) => {
  const [errors, setErrors] = useState([]);
  const [err, setErr] = useState(false);

  const checkParams = () => {
    const arr = [];
    const text = document.getElementById("text_box").value;
    if (!text.trim() || text.length === 0) {
      arr.push("Text cannot be empty!");
    }
    return arr;
  };

  const click = () => {
    let err = checkParams();
    if (err.length === 0) {
      props.changeQuestion(props.id);
    } else {
      setErr(true);
      setErrors(err);
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
    <div className="new_answer">
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
          onClick={click}
        >
          Post Question
        </button>
      </div>
    </div>
  );
};

export default EditQuestionPage;
