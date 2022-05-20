import React, { useState } from "react";

const ProfileTable = (props) => {
  const [index, setIndex] = useState(0);

  const data = props.data;
  console.log(data);

  const deleteQuestion = (e) => {
    props.deleteQuestion(e.target.value);
  };
  const editQuestion = (e) => {
    props.editQuestion(e.target.value);
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

  const renderQuestionTable = (data, index) => {
    if (data) {
      let starting = index * 5;
      let ending = (index + 1) * 5;
      let sliced = data.slice(starting, ending);
      return sliced.map((question, index) => {
        return (
          <tr key={index}>
            <td>
              <pre>{question.views} Views</pre>
            </td>
            <td>
              <button
                style={{
                  outline: "none",
                  border: "none",
                  backgroundColor: "#EDDFEF",
                  color: "#0281E8",
                  cursor: "pointer",
                }}
              >
                {question.title}
              </button>
            </td>
            <td style={{ textAlign: "right" }}>
              <pre>
                Asked by{" "}
                <span style={{ color: "blue" }}>{question.username}</span>
                <br></br>
                On{" "}
                <span style={{ color: "green" }}>
                  {getOn(new Date(question.ask_date_time))}
                </span>
                <br></br>
                At{" "}
                <span style={{ color: "navy" }}>
                  {getAt(new Date(question.ask_date_time))}
                </span>
              </pre>
            </td>
            <td style={{ textAlign: "right" }}>
              <div>
                <h2>{question.upvote - question.downvote} Votes</h2>
              </div>
            </td>
            <td style={{ textAlign: "right" }}>
              <button value={question.qid} onClick={editQuestion}>
                Edit
              </button>
              <button value={question.qid} onClick={deleteQuestion}>
                Delete
              </button>
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

export default ProfileTable;
