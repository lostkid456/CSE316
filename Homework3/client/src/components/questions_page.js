import React from "react";
import Header from "./header";
import Table from "./table";

export default class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleHeaderButton=this.handleHeaderButton.bind(this);
    this.handleQuestionLink=this.handleQuestionLink.bind(this);
  }

  handleHeaderButton(){
    this.props.headerButtonClick();
  }

  handleQuestionLink(question_id){
    this.props.questionLinkClick(question_id);
  }

  render() {
    const page = this.props.page;
    const data = this.props.data;
    return (
      <div className="question_page">
        <Header page={page} data={data} buttonClick={this.handleHeaderButton}/>
        <Table page={page} data={data} linkClick={this.handleQuestionLink}/>
      </div>
    );
  }
}
