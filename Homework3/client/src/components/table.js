import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
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

  handleLink(e) {
    this.props.linkClick(e.target.value);
  }

  onMouseOver(e) {
    e.target.style.color = "blue";
  }

  onMouseLeave(e) {
    e.target.style.color = "#0281E8";
  }

  renderTags(question) {
    return question["tags"].map((tag) => {
      return (
        <div
          key={tag.name + "" + question["_id"]}
          style={{
            border: "1px",
            borderRadius: "5px",
            borderStyle: "solid",
            color: "white",
            backgroundColor: "grey",
          }}
        >
          <p>{tag.name}</p>
        </div>
      );
    });
  }

  renderQuestionTable(data) {
    return data.map((question) => {
      return (
        <tr key={question["_id"]}>
          <td>
            <pre>
              {question["views"]} Views<br></br>
              {question["answers"].length} Answers
            </pre>
          </td>
          <td>
            <button
              value={question["_id"]}
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
              {question["title"]}
            </button>
            <br></br>
            <div className="tag_container">{this.renderTags(question)}</div>
          </td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Asked by{" "}
              <span style={{ color: "blue" }}>{question["asked_by"]}</span>
              <br></br>
              On{" "}
              <span style={{ color: "green" }}>
                {this.getOn(new Date(question["ask_date_time"]))}
              </span>
              <br></br>
              At{" "}
              <span style={{ color: "navy" }}>
                {this.getAt(new Date(question["ask_date_time"]))}
              </span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  renderSearchTable(results) {
    return results.map((question) => {
      return (
        <tr key={question["_id"]}>
          <td>
            <pre>
              {question["views"]} Views<br></br>
              {question["answers"].length} Answers
            </pre>
          </td>
          <td>
            <button
              value={question["_id"]}
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
              {question["title"]}
            </button>
            <br></br>
            <div className="tag_container">{this.renderTags(question)}</div>
          </td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Asked by{" "}
              <span style={{ color: "blue" }}>{question["asked_by"]}</span>
              <br></br>
              On{" "}
              <span style={{ color: "green" }}>
                {this.getOn(new Date(question["ask_date_time"]))}
              </span>
              <br></br>
              At{" "}
              <span style={{ color: "navy" }}>
                {this.getAt(new Date(question["ask_date_time"]))}
              </span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  renderAnswerInfo() {
    const data=this.props.linkdata;
    return(
    <tr>
      <td style={{ paddingBottom: "35px" }}>
        {data["views"]} Views
      </td>
      <td style={{ paddingBottom: "35px" }}>
        {data["title"]}
      </td>
      <td style={{ textAlign: "right", paddingBottom: "35px" }}>
        <pre>
          Asked by{" "}
          <span style={{ color: "blue" }}>
            {data["asked_by"]}
          </span>
          <br></br>
          On{" "}
          <span style={{ color: "green" }}>
            {this.getOn(new Date(data["ask_date_time"]))}
          </span>
          <br></br>
          At{" "}
          <span style={{ color: "navy" }}>
            {this.getAt(new Date(data["ask_date_time"]))}
          </span>
        </pre>
      </td>
    </tr>);    
  }

  renderAnswerTable() {
    const data = this.props.linkdata;
    console.log(data);
    data["answers"].sort(function(a,b){
      let a_date=new Date(a["ans_date_time"]);
      let b_date=new Date(b["ans_date_time"]);
      if (a_date - b_date > 0) {
        return -1;
      } else if (a_date - b_date < 0) {
        return 1;
      } else {
        return 0;
      }
    });
    return data["answers"].map((answer, index) => {
      return (
        <tr key={index}>
          <td colSpan={"2"}>{answer["text"]}</td>
          <td style={{ textAlign: "right" }}>
            <pre>
              Ans by <span style={{ color: "blue" }}>{answer["ans_by"]}</span>
              <br></br>
              On{" "}
              <span style={{ color: "green" }}>
                {this.getOn(new Date(answer["ans_date_time"]))}
              </span>
              <br></br>
              At{" "}
              <span style={{ color: "navy" }}>
                {this.getAt(new Date(answer["ans_date_time"]))}
              </span>
            </pre>
          </td>
        </tr>
      );
    });
  }

  render() {
    let page = this.props.page;
    let data = this.props.data;
    let result = this.props.result;
    let table_render;
    let answer_render;
    if (page === "q") {
      table_render = this.renderQuestionTable(data);
    } else if (page === "a") {
      answer_render = this.renderAnswerInfo();
      table_render = this.renderAnswerTable();
    } else if (page === "s" || page==="ts") {
      table_render = this.renderSearchTable(result);
    }else{}
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
