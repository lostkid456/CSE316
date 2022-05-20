import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick=this.onButtonClick.bind(this);
  }

  onButtonClick(){
    this.props.buttonClick();
  }

  render() {
    const page = this.props.page;
    const data = this.props.data;
    const answers=this.props.answers;
    const tag=this.props.tags;
    let first_column_render, second_column_render;
    let ask_button = (
      <button
        style={{
          width: "15%",
          float: "right",
          marginLeft: "100px",
          borderRadius: "10px",
          padding: "5px",
          backgroundColor: "#165A92",
          color: "white",
        }}
        onClick={this.onButtonClick}
      >
        Ask a Question
      </button>
    );
    if (page === "q") {
      first_column_render =
        data.length === 1 ? (
          <h2 style={{ width: "25%", float: "left" }}>
            {data.length} Question
          </h2>
        ) : (
          <h2 style={{ width: "25%", float: "left" }}>
            {data.length} Questions
          </h2>
        );
      second_column_render = <h2 style={{ width: "50%" }}>All Questions</h2>;
    }else if(page==="s"){
      first_column_render=data.length === 1 ? (
        <h2 style={{ width: "25%", float: "left" }}>
          {data.length} Question
        </h2>
      ) : (
        <h2 style={{ width: "25%", float: "left" }}>
          {data.length} Questions
        </h2>
      );
      second_column_render=data.length===0? <h2 style={{ width: "50%" }}>No Questions Found</h2>:<h2 style={{ width: "50%" }}>Search Results</h2>;
    }else if(page==="a"){
      first_column_render= answers.length===1 ? (<h2 style={{ width: "25%", float: "left" }}>
      {answers.length} Answer</h2>):(<h2 style={{ width: "25%", float: "left" }}>{answers.length} Answers</h2>)
      second_column_render=<h2 style={{ width: "50%" }}>{data.value.title}</h2>
    }else if(page==="ts"){
      first_column_render=data.length === 1 ? (
        <h2 style={{ width: "25%", float: "left" }}>
          {data.length} Question
        </h2>
      ) : (
        <h2 style={{ width: "25%", float: "left" }}>
          {data.length} Questions
        </h2>
      );
      second_column_render=<h2 style={{ width: "50%" }}>Questions tagged[{tag}]</h2>;
    }else if(page==="t"){
      first_column_render=tag.length===1 ? (<h2 style={{ width: "25%", float: "left" }}>
      {tag.length} Tag
    </h2>):(<h2 style={{ width: "25%", float: "left" }}>{tag.length} Tags</h2>);
    second_column_render=<h2 style={{ width: "50%" }}>All Tags</h2>;
    }
    return (
      <div className="header">
        {first_column_render}
        {second_column_render}
        {ask_button}
      </div>
    );
  }
}

