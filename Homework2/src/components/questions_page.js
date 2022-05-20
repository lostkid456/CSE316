import React from "react";
import QuestionTable from "./question_table";
import Header from "./header";

export default class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  handleLink(val) {
    this.props.newChange(val, "a");
  }

  handleNew() {
    this.props.newChange("", "n");
  }

  render() {
    const page = this.props.page;
    const model = this.props.model;
    return (
      <div className="question_page">
        <Header page={page} model={model} handleNew={this.handleNew} />
        <div className="question_table">
          <QuestionTable
            page={page}
            model={model}
            handleLink={this.handleLink}
          />
        </div>
      </div>
    );
  }
}
