import React, { useState } from "react";
import UserDropDown from "./user_dropdown";

const ProfileTag = (props) => {
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
  const editTag = (e) => {
    props.editTag(e.target.value);
  };
  const deleteTag = (e) => {
    props.deleteTag(e.target.value);
  };
  const renderTags = () => {
    console.log(props.Tags);
    return props.Tags.map((tag, index) => {
      return (
        <div className="linkdiv" key={index}>
          <button
            value={tag.name}
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "#EDDFEF",
              color: "#0281E8",
              cursor: "pointer",
            }}
          >
            {tag.name}
          </button>
          <div>
            <button value={tag.tid} onClick={editTag}>
              Edit
            </button>
            <button value={tag.tid} onClick={deleteTag}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  };
  if (props.Tags.length === 0) {
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
          <h1>NO TAGS</h1>
        </div>
      </div>
    );
  } else {
    const render = renderTags();
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
        <div className="tags_link_container">{render}</div>
      </div>
    );
  }
};

export default ProfileTag;
