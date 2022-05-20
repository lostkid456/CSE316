import React from "react";
import Header from "./header";
import Table from "./table";

export default class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.HeaderonButtonClick=this.HeaderonButtonClick.bind(this);
    }

    HeaderonButtonClick(){
        this.props.headerButtonClick();
    }

    render(){
        const result=this.props.result;
        const page=this.props.page;
        return <div>
            <Header page={page} result={result} buttonClick={this.HeaderonButtonClick}/>
            <Table page={page} result={result}/>
        </div>;
    }
}