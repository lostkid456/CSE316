import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleLink=this.handleLink.bind(this);
  }

  getOn(date) {
    return (
      String(date.toLocaleString("en-us", { month: "short" })) +
      " " +
      String(date.getDate()).padStart(2, "0") +
      "," +
      date.getFullYear()
    );
  }

  getAt(date) {
    return (
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
  }

  onMouseOver(e) {
    e.target.style.color = "blue";
  }

  onMouseLeave(e) {
    e.target.style.color = "#0281E8";
  }

  handleLink(e){
    this.props.linkClick(e.target.value);
  }

  renderTags(question) {
    return question.value.tags.map((tag) => {
      return (
        <div
          key={tag + "" + question.key}
          style={{
            border: "1px",
            borderRadius: "5px",
            borderStyle: "solid",
            color: "white",
            backgroundColor: "grey",
          }}
        >
          <p>{tag}</p>
        </div>
      );
    });
  }

  renderQuestionTable(data) {
    return data.map((question) => {
      return (
        <tr key={question.key}>
          <td>
            <pre>
              {question.value.views} Views<br></br>
              {question.value.answer_count} Answers <br></br>
            </pre>
          </td>
          <td>
            <button
              value={question.key}
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "white",
                color: "#0281E8",
                cursor: "pointer",
              }}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
              onClick={this.handleLink}
            >
              {question.value.title}
            </button>
            <br></br>
            <div className="tag_container">{this.renderTags(question)}</div>
          </td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Asked by{" "}
              <span style={{ color: "blue" }}>{question.value.asked_by}</span>
              <br></br>
              On{" "}
              <span style={{ color: "green" }}>
                {this.getOn(new Date(question.value.ask_date_time))}
              </span>
              <br></br>
              At{" "}
              <span style={{ color: "navy" }}>
                {this.getAt(new Date(question.value.ask_date_time))}
              </span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  renderAnswerInfo(data,answers){
    return(
      <tr>
        <td style={{ paddingBottom: "35px" }}>
          {data.value.views} Views
        </td>
        <td style={{ paddingBottom: "35px" }}>
          {data.value.text}
        </td>
        <td style={{ textAlign: "right", paddingBottom: "35px" }}>
          <pre>
            Asked by{" "}
            <span style={{ color: "blue" }}>
              {data.value.asked_by}
            </span>
            <br></br>
            On{" "}
            <span style={{ color: "green" }}>
              {this.getOn(new Date(data.value.ask_date_time))}
            </span>
            <br></br>
            At{" "}
            <span style={{ color: "navy" }}>
              {this.getAt(new Date(data.value.ask_date_time))}
            </span>
          </pre>
        </td>
      </tr>);    
  }

  renderAnswerTable(data,answers){
    return answers.map((answer,index)=>{
      return(
        <tr key={index}>
          <td colSpan={"2"}>{answer.text}</td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Ans by <span style={{ color: "blue" }}>{answer.ans_by}</span>
              <br></br>
              On{" "}
              <span style={{ color: "green" }}>
                {this.getOn(new Date(answer.ans_date_time))}
              </span>
              <br></br>
              At{" "}
              <span style={{ color: "navy" }}>
                {this.getAt(new Date(answer.ans_date_time))}
              </span>
            </pre>
          </td>
        </tr>
      )
    })
  }

  render() {
    let page = this.props.page;
    let data = this.props.data;
    let answers=this.props.answers;
    let table_render;
    let answer_render;
    if (page === "q"||page==="s"||page==="ts") {
      table_render = this.renderQuestionTable(data);
    } else if(page==="a"){
      table_render=this.renderAnswerTable(data,answers);
      answer_render=this.renderAnswerInfo(data,answers);
    }
    return (
      <table className="table" style={{ width: "100%", height: "90%" }}>
        <tbody>
          {answer_render}
          {table_render}
        </tbody>
      </table>
    );
  }
}
