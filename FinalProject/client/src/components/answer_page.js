import React from "react";
import AnswerDisplay from "./answers_display";
import Header from "./header";

const AnswerPage = (props) => {
  const newQuestionComment = () => {
    props.newQuestionComment();
  };

  const newAnswerComment = (aid) => {
    props.newAnswerComment(aid);
  };

  const upvote = () => {
    if (props.user[0].reputation >= 100) {
      props.upvote();
    }
  };
  const downvote = () => {
    if (props.user[0].reputation >= 100) {
      props.downvote();
    }
  };
  const newanswer = () => {
    props.newAnswer("na");
  };
  const newQuestion = () => {
    props.change_page("nq");
  };
  const newAnswerButton = () => {
    if (props.user) {
      return (
        <button
          style={{
            height: "50px",
            borderRadius: "10px",
            marginTop: "10px",
            backgroundColor: "#165A92",
            color: "white",
            fontSize: "medium",
            marginLeft: "50%",
          }}
          onClick={newanswer}
        >
          Answer Question
        </button>
      );
    }
  };
  return (
    <div>
      <Header
        page={props.page}
        user={props.user}
        answers={props.answers}
        question={props.data}
        newQuestion={newQuestion}
      />
      <AnswerDisplay
        user={props.user}
        question={props.data}
        answers={props.answers}
        answer_comments={props.answer_comments}
        upvote={upvote}
        downvote={downvote}
        newQuestionComment={newQuestionComment}
        newAnswerComment={newAnswerComment}
      />
      <div>{newAnswerButton()}</div>
    </div>
  );
};

export default AnswerPage;
