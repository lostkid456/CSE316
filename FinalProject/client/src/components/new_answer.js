import React, { useState } from "react";

const NewAnswerPage = (props) => {
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
      props.CreateNewAnswer();
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
      <div className="answer_text">
        <h1>Answer Text</h1>
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
          Post Answer
        </button>
      </div>
    </div>
  );
};

export default NewAnswerPage;
