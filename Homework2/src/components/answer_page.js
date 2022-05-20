import React from "react";
import Header from "./header";
import QuestionTable from "./question_table";

export default class AnswerPage extends React.Component{
    constructor(props){
        super(props);
        this.handleNewAnswer=this.handleNewAnswer.bind(this);
        this.handleNew=this.handleNew.bind(this);
    }

    handleNewAnswer(){
        this.props.newChange(this.props.val,"na");
    }

    handleNew(){
        this.props.newChange("", "n");
    }

    render(){
        return(<div className="answer_page">
            <Header page={this.props.page} model={this.props.model} val={this.props.val} handleNew={this.handleNew}/>
            <QuestionTable page={this.props.page} model={this.props.model} val={this.props.val}/>
            <button 
            style={{height: "50px",
              borderRadius: "10px",
              marginTop: "10px",
              backgroundColor: "#165A92",
              color: "white",
              fontSize: "medium", marginLeft:"50%"}}
              onClick={this.handleNewAnswer}>
                Answer Question
            </button>
        </div>);
    }
}