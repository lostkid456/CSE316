import React from "react";

export default class QuestionTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  onMouseOver(e) {
    e.target.style.color = "blue";
  }

  onMouseLeave(e) {
    e.target.style.color = "#0281E8";
  }

  handleLink(e) {
    this.props.handleLink(e.target.value);
  }

  renderTags(question) {
    return question.tagIds.map((ids) => {
      return (
        <div
          key={ids + question.qid}
          style={{
            border: "1px",
            borderRadius: "5px",
            borderStyle: "solid",
            color: "white",
            backgroundColor: "grey",
          }}
        >
          <p>{this.props.model.getNamefromTid(ids)}</p>
        </div>
      );
    });
  }

  renderAnswerTable() {
    const data = this.props.model.getDatafromName(this.props.val);
    this.props.model.sortAnswers(data);
    var that = this;
    return data.answers.map((answer, index) => {
      return (
        <tr key={index}>
          <td colSpan={"2"}>
            {that.props.model.getAnswerfromAid(answer).text}
          </td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Ans by{" "}
              <span style={{ color: "blue" }}>
                {that.props.model.getAnswerfromAid(answer).ansBy}
              </span>
              <br></br>
              On{" "}
              <span style={{ color: "green" }}>
                {that.props.model.getAnswerfromAid(answer).ansOn}
              </span>
              <br></br>
              At{" "}
              <span style={{ color: "navy" }}>
                {that.props.model.getAnswerfromAid(answer).ansAt}
              </span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  renderSearchTable() {
    const questions = this.props.questions;
    questions.sort(function (a, b) {
      let a_string = a.askedOn.replace(",", "").split(" ");
      let b_string = b.askedOn.replace(",", "").split(" ");
      let a_date = new Date(
        a_string[0] + " " + a_string[1] + " " + a_string[2] + " " + a.askedAt
      );
      let b_date = new Date(
        b_string[0] + " " + b_string[1] + " " + b_string[2] + " " + b.askedAt
      );
      if (a_date - b_date > 0) {
        return -1;
      } else if (a_date - b_date < 0) {
        return 1;
      } else {
        return 0;
      }
    });
    return questions.map((question) => {
      return (
        <tr key={question.qid}>
          <td>
            <pre>
              {question.views} Views <br></br>
              {question.answers.length} Answers
            </pre>
          </td>
          <td>
            <button
              value={question.title}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
              onClick={this.handleLink}
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "white",
                color: "#0281E8",
                cursor: "pointer",
              }}
            >
              {question.title}
            </button>
            <br></br>
            <div className="tag_container">{this.renderTags(question)}</div>
          </td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Asked by <span style={{ color: "blue" }}>{question.askedBy}</span>
              <br></br>
              On <span style={{ color: "green" }}>{question.askedOn}</span>
              <br></br>
              At <span style={{ color: "navy" }}>{question.askedAt}</span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  renderQuestionsTable() {
    this.props.model.sort_questions();
    return this.props.model.data.questions.map((question) => {
      return (
        <tr key={question.qid}>
          <td>
            <pre>
              {question.views} Views <br></br>
              {question.answers.length} Answers
            </pre>
          </td>
          <td>
            <button
              value={question.title}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
              onClick={this.handleLink}
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "white",
                color: "#0281E8",
                cursor: "pointer",
              }}
            >
              {question.title}
            </button>
            <br></br>
            <div className="tag_container">{this.renderTags(question)}</div>
          </td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Asked by <span style={{ color: "blue" }}>{question.askedBy}</span>
              <br></br>
              On <span style={{ color: "green" }}>{question.askedOn}</span>
              <br></br>
              At <span style={{ color: "navy" }}>{question.askedAt}</span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  render() {
    const page = this.props.page;
    let render;
    if (page === "q") {
      render = this.renderQuestionsTable();
    } else if (page === "s" || page==="ts") {
      render = this.renderSearchTable();
    } else if (page === "a") {
      return (
        <table
          className="question_table"
          style={{ width: "100%", height: "90%" }}
        >
          <tbody>
            <tr>
              <td style={{paddingBottom:"35px"}}>
                {this.props.model.getDatafromName(this.props.val).views} Views
              </td>
              <td style={{paddingBottom:"35px"}}>{this.props.model.getDatafromName(this.props.val).text}</td>
              <td style={{ textAlign: "right",paddingBottom:"35px"}}>
                <pre>
                  Asked by{" "}
                  <span style={{ color: "blue" }}>
                    {this.props.model.getDatafromName(this.props.val).askedBy}
                  </span>
                  <br></br>
                  On{" "}
                  <span style={{ color: "green" }}>
                    {this.props.model.getDatafromName(this.props.val).askedOn}
                  </span>
                  <br></br>
                  At{" "}
                  <span style={{ color: "navy" }}>
                    {this.props.model.getDatafromName(this.props.val).askedAt}
                  </span>
                </pre>
              </td>
            </tr>
            {this.renderAnswerTable()}
          </tbody>
        </table>
      );
    }else{}
    return (
      <table className="question_table" style={{ width: "100%" }}>
        <tbody>{render}</tbody>
      </table>
    );
  }
}
