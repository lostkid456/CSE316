import React, { useState } from "react";
import ProfileTable from "./profile_table";
import UserDropDown from "./user_dropdown";

const Profile = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdown_clicked = () => {
    setDropdown(!dropdown);
  };
  const deleteQuestion = (id) => {
    props.deleteQuestion(id);
  };
  const editQuestion = (id) => {
    props.editQuestion(id);
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
  let date1 = Date.now();
  let date2 = new Date(props.User[0].create_date);
  let difference = Math.abs(date2 - date1);
  let days = Math.round(difference / (1000 * 3600 * 24));
  if (props.Questions.length === 0) {
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
          <h1>User since {days} days ago</h1>
        </div>
        <div>
          <h1>NO QUESTIONS</h1>
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
        <div>
          <h1>User since {days} days ago</h1>
        </div>
        <ProfileTable
          data={props.Questions}
          editQuestion={editQuestion}
          deleteQuestion={deleteQuestion}
        />
      </div>
    );
  }
};

export default Profile;
