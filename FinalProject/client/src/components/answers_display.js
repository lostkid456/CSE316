import React, { useState } from "react";
import AnswerComment from "./answer_comment";

const AnswerDisplay = (props) => {
  const [aIndex, setAIndex] = useState(0);
  const [qcIndex, setQCIndex] = useState(0);

  var AFoward = <button onClick={() => setAIndex(aIndex + 1)}>Next</button>;
  var ABack = <button onClick={() => setAIndex(aIndex - 1)}>Back</button>;

  var QFoward = <button onClick={() => setQCIndex(qcIndex + 1)}>Next</button>;
  var QBack = <button onClick={() => setQCIndex(qcIndex - 1)}>Back</button>;

  const newQuestionComment = () => {
    props.newQuestionComment();
  };

  const newAnswerComment = (aid) => {
    props.newAnswerComment(aid);
  };

  const upvote = () => {
    props.upvote();
  };
  const downvote = () => {
    props.downvote();
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

  const renderQuestionComments = (index) => {
    if (props.question) {
      let starting = index * 3;
      let ending = (index + 1) * 3;
      if (index === 0) {
        QBack = <button disabled>Back</button>;
      }
      if (props.question.comments.length < (index + 1) * 3) {
        QFoward = <button disabled>Next</button>;
      }
      let sliced = props.question.comments.slice(starting, ending);

      return sliced.map((comment, index) => {
        return (
          <tr key={index}>
            <td>{comment.text}</td>
            <td style={{ textAlign: "right" }}>
              <pre>
                Ans by <span style={{ color: "blue" }}>{comment.user}</span>
                <br></br>
                On{" "}
                <span style={{ color: "green" }}>
                  {getOn(new Date(comment.c_date_time))}
                </span>
                <br></br>
                At{" "}
                <span style={{ color: "navy" }}>
                  {getAt(new Date(comment.c_date_time))}
                </span>
              </pre>
            </td>
          </tr>
        );
      });
    }
  };

  const renderAnswers = (index) => {
    if (props.answers) {
      let starting = index * 5;
      let ending = (index + 1) * 5;
      if (index === 0) {
        ABack = <button disabled>Back</button>;
      }
      if (props.answers.answers.length < (index + 1) * 5) {
        AFoward = <button disabled>Next</button>;
      }
      let sliced = props.answers.answers.slice(starting, ending);
      return sliced.map((answer, index) => {
        return (
          <tr key={index}>
            <td colSpan={"2"}>{answer.text}</td>
            <td style={{ textAlign: "right" }}>
              <pre>
                Ans by <span style={{ color: "blue" }}>{answer.username}</span>
                <br></br>
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
            <td style={{ paddingLeft: "10%" }}>
              <AnswerComment
                answer={answer}
                comments={props.answer_comments[index]}
                user={props.user}
                newAnswerComment={newAnswerComment}
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div>
      <div>
        <table
          className="Question_Info"
          style={{ width: "100%", height: "90%" }}
        >
          <tbody>
            <tr>
              <td>
                <h2>{props.question.views} Views</h2>
              </td>
              <td>
                <h3>Summary</h3>
                {props.question.summary}
              </td>
              <td>
                <h3>Text</h3>
                {props.question.text}
              </td>
              <td style={{ textAlign: "right" }}>
                Asked by{" "}
                <span style={{ color: "blue" }}>{props.question.username}</span>
                <br></br>
                On{" "}
                <span style={{ color: "green" }}>
                  {getOn(new Date(props.question.ask_date_time))}
                </span>
                <br></br>
                At{" "}
                <span style={{ color: "navy" }}>
                  {getAt(new Date(props.question.ask_date_time))}
                </span>
              </td>
              <td style={{ textAlign: "right" }}>
                <button
                  className={props.user ? "button" : "offscreen"}
                  onClick={upvote}
                >
                  Upvote
                </button>
                <h2>{props.question.upvote - props.question.downvote} Votes</h2>
                <button
                  className={props.user ? "button" : "offscreen"}
                  onClick={downvote}
                >
                  Downvote
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="Question_Comments" style={{ width: "100%" }}>
          <tbody>{renderQuestionComments(qcIndex)}</tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          {QBack}
          {QFoward}
        </div>
        <button
          className={props.user ? "button" : "offscreen"}
          onClick={newQuestionComment}
        >
          New Question Comment
        </button>
      </div>
      <div>
        <table className="Answers" style={{ width: "100%", height: "90%" }}>
          <tbody>{renderAnswers(aIndex)}</tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          {ABack}
          {AFoward}
        </div>
      </div>
    </div>
  );
};

export default AnswerDisplay;
