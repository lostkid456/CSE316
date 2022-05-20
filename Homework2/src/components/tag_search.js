import React from "react";
import Header from "./header";
import QuestionTable from "./question_table";

export default class TagsSearch extends React.Component{
    constructor(props){
        super(props);
        this.handleLink=this.handleLink.bind(this);
        this.handleNew=this.handleNew.bind(this);
    }

    handleLink(val){
        this.props.newChange(val,"a");
    }

    handleNew(){
        this.props.newChange("","n");
    }

    render(){
        const result=this.props.result;
        const page=this.props.page;
        const model=this.props.model;
        return(
            <div>
                <Header page={page} results={result} handleNew={this.handleNew} val={this.props.val}/>
                <QuestionTable page={page} questions={result} model={model} handleLink={this.handleLink}/>
            </div>
        );
    }
}