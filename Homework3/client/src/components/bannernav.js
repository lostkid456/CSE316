import React from "react";
import Questions from "./questions.js";
import Tags from "./tags";
import Search from "./search";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.onBannerClick = this.onBannerClick.bind(this);
    this.onSearch=this.onSearch.bind(this);
  }

  onBannerClick(page) {
    this.props.bannerClick(page);
  }

  onSearch(query){
    this.props.query(query);
  }

  render() {
    const page = this.props.page;
    return (
      <div className="banner" id="banner">
        <Questions page={page} onClick={this.onBannerClick}/>
        <Tags page={page} onClick={this.onBannerClick}/>
        <h1
          style={{ width: "50%", paddingLeft: "10%" }}
        >
          Fake Stack Overflow
        </h1>
        <Search onSearch={this.onSearch}/>
      </div>
    );
  }
}
