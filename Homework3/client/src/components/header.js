import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.props.buttonClick();
  }

  render() {
    const page = this.props.page;
    const data = this.props.data;
    const result = this.props.result;
    const linkdata = this.props.linkdata;
    const tags = this.props.tags;
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
      if (data.length === 1) {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {data.length} Question
          </h2>
        );
        second_column_render = <h2 style={{ width: "50%" }}>All Questions</h2>;
      } else {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {data.length} Questions
          </h2>
        );
        second_column_render = <h2 style={{ width: "50%" }}>All Questions</h2>;
      }
    } else if (page === "t") {
      if(tags.length===1){
      first_column_render = (
        <h2 style={{ width: "25%", float: "left" }}>
          {tags.length} Tag
        </h2>
      );
      }else{
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {tags.length} Tags
          </h2>
        );
      }
      second_column_render=<h2 style={{ width: "50%" }}>All Tags</h2>;
    } else if (page === "s") {
      if (result.length === 0) {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {result.length} Questions
          </h2>
        );
        second_column_render = (
          <h2 style={{ width: "50%" }}>No Questions Found</h2>
        );
      } else if (result.length === 1) {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {result.length} Question
          </h2>
        );
        second_column_render = <h2 style={{ width: "50%" }}>Search Results</h2>;
      } else {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {result.length} Questions
          </h2>
        );
        second_column_render = <h2 style={{ width: "50%" }}>Search Result</h2>;
      }
    } else if (page === "a") {
      if (linkdata["answers"].length === 1) {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {linkdata["answers"].length} Answer
          </h2>
        );
      } else {
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {linkdata["answers"].length} Answers
          </h2>
        );
      }
      second_column_render = (
        <h2 style={{ width: "50%" }}>{linkdata["title"]}</h2>
      );
    } else if (page === "ts") {
      if(result.length===1){
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {result.length} Question
          </h2>
        );
      }else{
        first_column_render = (
          <h2 style={{ width: "25%", float: "left" }}>
            {result.length} Questions
          </h2>
        );
      }
      second_column_render=(<h2 style={{ width: "50%" }}>Questions tagged [{this.props.tag}]</h2>);
    } else {
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
