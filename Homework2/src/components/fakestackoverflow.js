import React from "react";
import Model from "../models/model.js";
import Banner from "./bannernav.js";
import QuestionsPage from "./questions_page.js";
import TagsPage from "./tags_page.js";
import SearchPage from "./search_page.js";
import NewQuestionPage from "./new_question.js";
import AnswerPage from "./answer_page.js";
import NewAnswerPage from "./new_answer.js";
import TagsSearch from "./tag_search.js";

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { val: "", page: "q" ,model:new Model()};
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleAddQuestion=this.handleAddQuestion.bind(this);
  }

  handlePageChange(val, page) {
    this.setState({ val: val, page: page });
  }

  handleAddQuestion(){
    this.state.model.addQuestion();
    this.setState({page:"q"});
  }

  render() {
    const val= this.state.val;
    const page = this.state.page;
    const model = this.state.model;
    let render;
    if(page==="q"){
      render=<QuestionsPage model={model} page={page} newChange={this.handlePageChange}/>
    }else if(page==="t"){
      render=<TagsPage model={model} page={page} newChange={this.handlePageChange}/>
    }else if(page==="s"){
      const result=model.search(val);
      render=<SearchPage model={model} result={result} page={page}  newChange={this.handlePageChange}/>
    }else if(page==="n"){
      render=<NewQuestionPage model={model} newChange={this.handlePageChange} newQuestion={this.handleAddQuestion}/>
    }else if(page==="a"){
      model.updateView(val);
      render=<AnswerPage  val={val} model={model} page={page} newChange={this.handlePageChange}/>
    } else if(page==="na"){
      render=<NewAnswerPage model={model} val={val} page={page} newChange={this.handlePageChange}/>
    }else if(page==="ts"){
      const result=model.search(val);
      render=<TagsSearch model={model} result={result} page={page} val={val} newChange={this.handlePageChange}/>
    }
    else{}
    return (
      <div className="fakestackoverflow">
        <Banner page={page} newChange={this.handlePageChange} />
        <div className="main">{render}</div>
      </div>
    );
  }
}
