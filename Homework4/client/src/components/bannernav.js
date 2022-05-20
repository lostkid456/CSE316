import React from "react";
import Questions from "./questions";
import Search from "./search";
import Tags from "./tags";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.search = this.search.bind(this);
  }

  click(page) {
    this.props.bannerClick(page);
  }

  search(query) {
    this.props.query(query);
  }

  render() {
    const page = this.props.page;
    return (
      <div className="banner" id="banner">
        <Questions page={page} click={this.click} />
        <Tags page={page} click={this.click} />
        <h1 style={{ width: "50%", paddingLeft: "10%" }}>
          Fake Stack Overflow
        </h1>
        <Search page={page} search={this.search}/>
      </div>
    );
  }
}
