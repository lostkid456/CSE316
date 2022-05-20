import React from "react";
import Header from "./header";
import Table from "./table";

export default class TagsSearch extends React.Component{
    constructor(props){
        super(props);
        this.handleLink=this.handleLink.bind(this);
        this.handleNew=this.handleNew.bind(this);
    }

    handleLink(question_id){
        this.props.questionLinkClick(question_id);
    }

    handleNew(){
        this.props.headerButtonClick();
    }

    render(){
        const page=this.props.page;
        const result=this.props.result;
        const tag=this.props.tag
        return(
            <div>
                <Header page={page}  result={result} buttonClick={this.handleNew} tag={tag}/>
                <Table page={page} result={result} linkClick={this.handleLink}/>
            </div>
        );
    }
}