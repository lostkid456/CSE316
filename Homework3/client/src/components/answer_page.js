import React from "react";
import Header from "./header";
import Table from "./table";

export default class AnswerPage extends React.Component{
    constructor(props){
        super(props);
        this.handleNewAnswer=this.handleNewAnswer.bind(this);
        this.handleHeaderButton=this.handleHeaderButton.bind(this);
    }

    handleNewAnswer(){
        this.props.newAnswerButton();
    }    

    handleHeaderButton(){
        this.props.headerButtonClick();
    }
    

    render(){
        return(<div className="answer_page">
            <Header page={this.props.page} linkdata={this.props.linkdata} buttonClick={this.handleHeaderButton}/>
            <Table page={this.props.page} linkdata={this.props.linkdata}/>
            <button 
            style={{height: "50px",
              borderRadius: "10px",
              marginTop: "10px",
              backgroundColor: "#165A92",
              color: "white",
              fontSize: "medium", marginLeft:"50%"}}
              onClick={this.handleNewAnswer}
              >
                Answer Question
            </button>
        </div>);
    }
}