import React, { useState } from "react";

const ProfileAnswerTable = (props) => {
  const [aIndex, setAIndex] = useState(0);
  var AFoward = <button onClick={() => setAIndex(aIndex + 1)}>Next</button>;
  var ABack = <button onClick={() => setAIndex(aIndex - 1)}>Back</button>;

  const editAnswer = (e) => {
    props.editAnswer(e.target.value);
  };

  const deleteAnswer = (e) => {
    props.deleteAnswer(e.target.value);
  };

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

  const renderAnswers = (index) => {
    if (props.answers) {
      let starting = index * 5;
      let ending = (index + 1) * 5;
      if (index === 0) {
        ABack = <button disabled>Back</button>;
      }
      if (props.answers.length < (index + 1) * 5) {
        AFoward = <button disabled>Next</button>;
      }
      let sliced = props.answers.slice(starting, ending);
      return sliced.map((answer, index) => {
        return (
          <tr key={index}>
            <td colSpan={"2"}>{answer.text}</td>
            <td style={{ textAlign: "right" }}>
              <pre>
                On{" "}
                <span style={{ color: "green" }}>
                  {getOn(new Date(answer.ans_date_time))}
                </span>
                <br></br>
                At{" "}
                <span style={{ color: "navy" }}>
                  {getAt(new Date(answer.ans_date_time))}
                </span>
              </pre>
            </td>
            <td style={{ textAlign: "right" }}>
              <button value={answer.aid} onClick={editAnswer}>
                Edit
              </button>
              <button value={answer.aid} onClick={deleteAnswer}>
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div>
      <table className="Answers" style={{ width: "100%", height: "90%" }}>
        <tbody>{renderAnswers(aIndex)}</tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        {ABack}
        {AFoward}
      </div>
    </div>
  );
};

export default ProfileAnswerTable;
