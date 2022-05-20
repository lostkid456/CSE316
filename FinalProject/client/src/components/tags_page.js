import React from "react";
import Header from "./header";

const TagsPage = (props) => {
  const tags = props.tags;
  const data = props.data;
  const NewQuestion = () => {
    props.changePage("nq");
  };
  const onMouseOver = (e) => {
    e.target.style.color = "blue";
  };
  const onMouseLeave = (e) => {
    e.target.style.color = "#0281E8";
  };
  const onClick = (e) => {
    props.query("[" + e.target.value + "]");
  };
  const getTagCount = (tag) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (data[i].value.tags[j] === tag) {
          count += 1;
          break;
        }
      }
    }
    if (count === 1) {
      return count + " question";
    } else {
      return count + " questions";
    }
  };
  const renderTags = () => {
    return tags.map((tag, index) => {
      return (
        <div className="linkdiv" key={index}>
          <button
            value={tag.name}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
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
          <h2 style={{ fontWeight: "normal", fontSize: "medium" }}>
            {getTagCount(tag.name)}
          </h2>
        </div>
      );
    });
  };
  const render = renderTags();
  return (
    <div className="tags_page">
      <Header page={props.page} newQuestion={NewQuestion} user={props.user} />
      <div className="tags_link_container">{render}</div>
    </div>
  );
};

export default TagsPage;
