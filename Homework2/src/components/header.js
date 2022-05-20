import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleNew();
  }

  render() {
    const page = this.props.page;
    const model = this.props.model;
    if (page === "q") {
      return (
        <div className="question_header">
          <h2 style={{ width: "25%", float: "left" }}>
            {model.data.questions.length} Questions
          </h2>
          <h2 style={{ width: "50%" }}>All Questions</h2>
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
            onClick={this.handleClick}
          >
            Ask a Question
          </button>
        </div>
      );
    } else if (page === "s") {
      if (this.props.results.length === 0) {
        return (
          <div className="question_header">
            <h2 style={{ width: "25%", float: "left" }}>0 Questions</h2>
            <h2 style={{ width: "50%" }}>No Questions Found</h2>
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
              onClick={this.handleClick}
            >
              Ask a Question
            </button>
          </div>
        );
      } else {
        return (
          <div className="question_header">
            <h2 style={{ width: "25%", float: "left" }}>
              {this.props.results.length} Questions
            </h2>
            <h2 style={{ width: "50%" }}>Search Results</h2>
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
              onClick={this.handleClick}
            >
              Ask a Question
            </button>
          </div>
        );
      }
    } else if (page === "a") {
      return (
        <div className="answer_header">
          <h2 style={{ width: "25%", float: "left" }}>
            {model.getDatafromName(this.props.val).answers.length}{" "}
            Answers
          </h2>
          <h2 style={{ width: "50%" }}>{this.props.val}</h2>
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
            onClick={this.handleClick}
          >
            Ask a Question
          </button>
        </div>
      );
    } else if (page === "t") {
      return (
        <div className="question_header">
          <h2 style={{ width: "25%", float: "left" }}>
            {this.props.model.data.tags.length} Tags
          </h2>
          <h2 style={{ width: "50%" }}>All Tags</h2>
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
            onClick={this.handleClick}
          >
            Ask a Question
          </button>
        </div>
      );
    } else if (page === "ts") {
      return (
        <div className="question_header">
          <h2 style={{ width: "25%", float: "left" }}>
            {this.props.results.length} Questions
          </h2>
          <h2 style={{ width: "50%" }}>Questions taggged{this.props.val}</h2>
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
            onClick={this.handleClick}
          >
            Ask a Question
          </button>
        </div>
      );
    } else {
    }
  }
}
