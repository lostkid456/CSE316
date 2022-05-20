import React, { useState } from "react";
import ProfileAnswerTable from "./profile_answer_table";
import UserDropDown from "./user_dropdown";

const ProfileAnswer = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdown_clicked = () => {
    setDropdown(!dropdown);
  };
  const toQuestion = () => {
    props.toQuestion("profile");
  };
  const toAnswer = () => {
    props.toAnswer("profile_answer");
  };
  const toTag = () => {
    props.toTag("profile_tag");
  };
  const editAnswer = (id) => {
    props.editAnswer(id);
  };
  const deleteAnswer = (id) => {
    props.deleteAnswer(id);
  };
  console.log(props.Answers);
  if (props.Answers.length === 0) {
    return (
      <div>
        <div
          className="dropdown_container"
          style={{ height: "30%", justifyContent: "right" }}
          onClick={dropdown_clicked}
        >
          Options
          {dropdown && (
            <UserDropDown
              toQuestion={toQuestion}
              toAnswer={toAnswer}
              toTag={toTag}
            />
          )}
        </div>
        <div>
          <h1>NO ANSWERS</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="dropdown_container"
          style={{ height: "30%", justifyContent: "right" }}
          onClick={dropdown_clicked}
        >
          Options
          {dropdown && (
            <UserDropDown
              toQuestion={toQuestion}
              toAnswer={toAnswer}
              toTag={toTag}
            />
          )}
        </div>
        <ProfileAnswerTable
          answers={props.Answers}
          editAnswer={editAnswer}
          deleteAnswer={deleteAnswer}
        />
      </div>
    );
  }
};

export default ProfileAnswer;
