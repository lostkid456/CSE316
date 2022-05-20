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
    console.log(e.target.value);
    this.props.tagClick(e.target.value);
  }

  getTagCount(tag){
    let count=0;
    for(let i=0;i<this.props.data.length;i++){
      for(let j=0;j<this.props.data[i]["tags"].length;j++){
        if(this.props.data[i]["tags"][j]["name"]===tag){
          count+=1;
          break;
        }
      }
    }
    if(count===1){
      return count+" question"
    }else{
      return count+" questions"
    }
  }

  renderTags(){
      return this.props.tags.map((tag)=>{
          return (
              <div className="linkdiv" key={tag["_id"]}>
                  <button value={tag["name"]}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
              onClick={this.handleLink}
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "white",
                color: "#0281E8",
                cursor: "pointer",
              }}>{tag["name"]}</button>
                  <h2 style={{fontWeight:"normal",fontSize:"medium"}}>{this.getTagCount(tag["name"])}</h2>
              </div>
          )
      });
    }

  render() {
    const page = this.props.page;
    const tags=this.props.tags;
    return (
      <div className="tags_page">
        <Header page={page} buttonClick={this.handleNew} tags={tags}/>
        <div className="tags_link_container">
            {this.renderTags()}
        </div>
      </div>
    );
  }
}