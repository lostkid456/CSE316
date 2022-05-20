import React from "react";
import Header from "./header";
import Table from "./table";

export default class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.HeaderButtonClick=this.HeaderButtonClick.bind(this);
        this.linkClick=this.linkClick.bind(this);
    }

    HeaderButtonClick(){
        this.props.headerButtonClick();
    }

    linkClick(question_id){
        this.props.questionLinkClick(question_id);
    }


    render(){
        const data=this.props.data;
        const page=this.props.page;
        return <div>
            <Header page={page} data={data} buttonClick={this.HeaderButtonClick}/>
            <Table page={page} data={data} />
        </div>;
    }
}