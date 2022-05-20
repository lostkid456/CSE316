import React from "react";
import Questions from "./questions.js";
import Tags from "./tags";
import Search from "./search";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(val, page) {
    this.props.newChange(val, page);
  }

  render() {
    const page = this.props.page;
    return (
      <div className="banner" id="banner">
        <Questions onChange={this.onChange} page={page} />
        <Tags onChange={this.onChange} page={page} />
        <h1
          style={{ width: "50%", paddingLeft: "10%" }}
          onChange={this.onChange}
        >
          Fake Stack Overflow
        </h1>
        <Search onChange={this.onChange} />
      </div>
    );
  }
}
