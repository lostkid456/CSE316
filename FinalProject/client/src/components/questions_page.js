import React from "react";
import Header from "./header";
import Table from "./table";

const QuestionPage = (props) => {
  const data = props.data;
  const page = props.page;

  const newQuestion = () => {
    props.changePage("nq");
  };

  const questionLink = (id) => {
    props.handleLink(id);
  };

  return (
    <div className="question_page">
      <Header page={page} user={props.user} newQuestion={newQuestion} />
      <Table
        data={data}
        page={page}
        user={props.user}
        handleLink={questionLink}
      />
    </div>
  );
};

export default QuestionPage;
