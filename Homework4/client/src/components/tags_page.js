import React from "react";
import Header from "./header";

export default class TagsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  onMouseOver(e) {
    e.target.style.color = "blue";
  }

  onMouseLeave(e) {
    e.target.style.color = "#0281E8";
  }

  handleNew() {
    this.props.headerButtonClick();
  }

  handleLink(e) {
    this.props.tagClick(e.target.value);
  }

  getTagCount(tag) {
    let count = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      for (let j = 0; j < this.props.data[i].value.tags.length; j++) {
        if (this.props.data[i].value.tags[j] === tag) {
          count += 1;
          break;
        }
      }
    }
    if (count === 1) {
      return count + " question";
    } else {
      return count + " questions";
    }
  }

  renderTags() {
    return this.props.tags.map((tag, index) => {
      return (
        <div className="linkdiv" key={index}>
          <button
            value={tag}
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
            {tag}
          </button>
          <h2 style={{ fontWeight: "normal", fontSize: "medium" }}>{this.getTagCount(tag)}</h2>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="tags_page">
          <Header page={this.props.page} buttonClick={this.handleNew} tags={this.props.tags}/>
        <div className="tags_link_container">{this.renderTags()}</div>
      </div>
    );
  }
}
