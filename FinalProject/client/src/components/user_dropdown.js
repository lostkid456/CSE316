import React, { useState } from "react";

const UserDropDown = (props) => {
  const [clicked, setClicked] = useState(false);
  const onDropdownClick = () => setClicked(!clicked);
  const toQuestion = () => {
    props.toQuestion();
  };
  const toTag = () => {
    props.toTag();
  };
  const toAnswer = () => {
    props.toAnswer();
  };
  return (
    <div style={{ display: "inline-block" }}>
      <ul
        onClick={onDropdownClick}
        className={clicked ? "dropdown_clicked" : "dropdown_menu"}
      >
        <li key={0}>
          <button onClick={toQuestion} style={{ width: "100%" }}>
            Questions
          </button>
        </li>
        <li key={1}>
          <button onClick={toTag} style={{ width: "100%" }}>
            Tags
          </button>
        </li>
        <li key={2}>
          <button onClick={toAnswer} style={{ width: "100%" }}>
            Answers
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
