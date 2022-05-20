import React, { useState } from "react";

const AnswerComment = (props) => {
  console.log(props.comments);
  const [index, setIndex] = useState(0);
  const Foward = () => setIndex(index + 1);
  const Back = () => setIndex(index - 1);
  const AddAnswerComment = () => {
    props.newAnswerComment(props.answer.aid);
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

  var ACFoward = <button onClick={Foward}>Next</button>;
  var ACBack = <button onClick={Back}>Back</button>;
  const renderComment = (index) => {
    if (!props.user) {
      ACFoward = <button className="offscreen"></button>;
      ACBack = <button className="offscreen"></button>;
    }
    if (props.comments) {
      let starting = index * 3;
      let ending = (index + 1) * 3;
      if (index === 0) {
        ACBack = <button disabled>Back</button>;
      }
      if (props.comments.length < (index + 1) * 3) {
        ACFoward = <button disabled>Next</button>;
      }
      let sliced = props.comments.slice(starting, ending);
      return sliced.map((comment, index) => {
        return (
          <div key={index}>
            <div>
              {comment.text}
              <pre>
                Comment by <span style={{ color: "blue" }}>{comment.user}</span>
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
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div>
      <div>
        {renderComment(index)}
        {ACBack}
        {ACFoward}
      </div>
      <button
        className={props.user ? "button" : "offscreen"}
        onClick={AddAnswerComment}
      >
        Add Answer Comment
      </button>
    </div>
  );
};

export default AnswerComment;
