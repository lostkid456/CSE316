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
        const data=this.props.data;
        const tag=this.props.tags;
        return(
            <div>
                <Header page={page} data={data} buttonClick={this.handleNew} tags={tag}/>
                <Table page={page} data={data} linkClick={this.handleLink}/>
            </div>
        );
    }
}