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

  renderTags(){
      return this.props.model.data.tags.map((tag)=>{
          return (
              <div className="linkdiv" key={tag.tid}>
                  <button value={tag.name}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
              onClick={this.handleLink}
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "white",
                color: "#0281E8",
                cursor: "pointer",
              }}>{tag.name}</button>
                  <h2 style={{fontWeight:"normal",fontSize:"medium"}}>{this.props.model.findAmountforTag(tag.tid)}</h2>
              </div>
          )
      });
  }

  handleNew() {
    this.props.newChange("", "n");
  }

  handleLink(e) {
    this.props.newChange("["+e.target.value+"]","ts");
  }

  render() {
    const page = this.props.page;
    const model = this.props.model;
    return (
      <div className="tags_page">
        <Header page={page} model={model} handleNew={this.handleNew} />
        <div className="tags_link_container">
            {this.renderTags()}
        </div>
      </div>
    );
  }
}
