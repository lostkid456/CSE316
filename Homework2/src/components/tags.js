import React from "react";

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onChange("", "t");
  }

  render() {
    return (
      <button
        style={{
          float: "left",
          width: "12.5%",
          backgroundColor: this.props.page === "t" ? "#0281E8" : "lightgrey",
        }}
        onClick={this.onClick}
      >
        Tags
      </button>
    );
  }
}
