import React from "react";

const Header = (props) => {
  let first_column_render, second_column_render, ask_button;
  const newQuestion = () => {
    props.newQuestion();
  };
  if (props.user) {
    ask_button = (
      <button style={{ marginLeft: "30%" }} onClick={newQuestion}>
        Ask a Question
      </button>
    );
  }
  if (props.page === "q") {
    first_column_render = <h1 style={{ marginLeft: "40%" }}>All Questions</h1>;
  } else if (props.page === "t") {
    first_column_render = <h1 style={{ marginLeft: "50%" }}>All Tags</h1>;
  } else if (props.page === "s") {
    if (props.data.length === 0) {
      first_column_render = (
        <h1 style={{ marginLeft: "40%" }}>No Results Found</h1>
      );
    } else {
      first_column_render = (
        <h1 style={{ marginLeft: "40%" }}>Search Results</h1>
      );
    }
  } else if (props.page === "a") {
    first_column_render = (
      <h2 style={{ width: "25%" }}>{props.answers.answers.length} Answers</h2>
    );
    second_column_render = (
      <h2 style={{ width: "50%" }}>{props.question.title}</h2>
    );
  }
  return (
    <div className="header">
      {first_column_render}
      {second_column_render}
      {ask_button}
    </div>
  );
};

export default Header;
