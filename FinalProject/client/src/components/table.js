import React, { useState } from "react";

const Table = (props) => {
  const [index, setIndex] = useState(0);

  const data = props.data;

  const linkClick = (e) => {
    props.handleLink(e.target.value);
  };

  const goFoward = () => setIndex(index + 1);
  const goBack = () => setIndex(index - 1);

  const getOn = (date) => {
    return (
      String(date.toLocaleString("en-us", { month: "short" })) +
      " " +
      String(date.getDate()).padStart(2, "0") +
      "," +
      date.getFullYear()
    );
  };

  const getAt = (date) => {
    return (
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
  };

  const onMouseOver = (e) => (e.target.style.color = "blue");
  const onMouseLeave = (e) => (e.target.style.color = "#0281E8");

  const renderTags = (question) => {
    return question.value.tags.map((tag) => {
      return (
        <div
          key={tag + "" + question.key}
          style={{
            border: "1px",
            borderRadius: "5px",
            borderStyle: "solid",
            color: "white",
            backgroundColor: "grey",
          }}
        >
          <p>{tag}</p>
        </div>
      );
    });
  };

  const renderQuestionTable = (data, index) => {
    if (data) {
      let starting = index * 5;
      let ending = (index + 1) * 5;
      let sliced = data.slice(starting, ending);
      return sliced.map((question) => {
        return (
          <tr key={question.key}>
            <td>
              <pre>
                {question.value.views} Views<br></br>
                {question.value.answer_count} Answers <br></br>
              </pre>
            </td>
            <td>
              <button
                value={question.key}
                style={{
                  outline: "none",
                  border: "none",
                  backgroundColor: "#EDDFEF",
                  color: "#0281E8",
                  cursor: "pointer",
                }}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                onClick={linkClick}
              >
                {question.value.title}
              </button>
              <br></br>
              <div className="tag_container">{renderTags(question)}</div>
            </td>
            <td style={{ textAlign: "right" }}>
              <pre>
                Asked by{" "}
                <span style={{ color: "blue" }}>{question.value.username}</span>
                <br></br>
                On{" "}
                <span style={{ color: "green" }}>
                  {getOn(new Date(question.value.ask_date_time))}
                </span>
                <br></br>
                At{" "}
                <span style={{ color: "navy" }}>
                  {getAt(new Date(question.value.ask_date_time))}
                </span>
              </pre>
            </td>
            <td style={{ textAlign: "right" }}>
              <div>
                <h2>{question.value.upvote - question.value.downvote}</h2>
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  let table_render;
  var front_button = <button onClick={goFoward}>Next</button>;
  var back_button = <button onClick={goBack}>Back</button>;

  if (data) {
    if (data.length <= (index + 1) * 5)
      front_button = <button disabled>Next</button>;
    if (index === 0) back_button = <button disabled>Back</button>;
    table_render = renderQuestionTable(data, index);
  }

  return (
    <div>
      <table className="table" style={{ width: "100%", height: "90%" }}>
        <tbody>{table_render}</tbody>
      </table>
      <div style={{ paddingLeft: "50%" }}>
        {back_button}
        {front_button}
      </div>
    </div>
  );
};

export default Table;
