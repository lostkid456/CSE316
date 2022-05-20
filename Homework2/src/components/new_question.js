import React from "react";

export default class NewQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false, errors: [] };
    this.click = this.click.bind(this);
  }

  click(e) {
    e.preventDefault();
    const arr = this.props.model.checkQuestion();
    if (arr.length === 0) {
      this.props.newQuestion();
    } else {
      this.setState({ error: "true", errors: arr });
    }
  }

  render() {
    const error = this.state.error;
    let error_state;
    if (error) {
      error_state = (
        <div className="error_space">
          {this.state.errors.map((error, index) => {
            return (
              <div key={error}>
                <span style={{ color: "red" }}>{error}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div className="new_question">
        {error_state}
        <div className="question_title">
          <h1>Question Title</h1>
          <h2 style={{ fontSize: "medium" }}>
            Title should not be more than 100 characters
          </h2>
          <textarea id="title_box" rows={"2"} cols={"100"}></textarea>
        </div>
        <div className="question_text">
          <h1>Question Text</h1>
          <h2 style={{ fontSize: "medium" }}>Add details</h2>
          <textarea id="text_box" rows={"5"} cols={"100"}></textarea>
        </div>
        <div className="tags">
          <h1>Tags</h1>
          <h2 style={{ fontSize: "medium" }}>
            Add Keywords seperated by whitespace
          </h2>
          <textarea id="tag_box" rows={"2"} cols={"100"}></textarea>
        </div>
        <div className="user">
          <h1>User</h1>
          <h2 style={{ fontSize: "medium" }}>
            Should not be more than 15 characters
          </h2>
          <textarea id="user_box" rows={"2"} cols={"100"}></textarea>
        </div>
        <div>
          <button
            style={{
              height: "50px",
              borderRadius: "10px",
              marginTop: "10px",
              backgroundColor: "#165A92",
              color: "white",
              fontSize: "medium",
            }}
            onClick={this.click}
          >
            Post Question
          </button>
        </div>
      </div>
    );
  }
}
