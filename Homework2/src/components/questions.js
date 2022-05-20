import React from "react";

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onChange("", "q");
  }

  render() {
    return (
      <button
        style={{
          float: "left",
          width: "12.5%",
          backgroundColor: this.props.page === "q" ? "#0281E8" : "lightgrey",
        }}
        onClick={this.onClick}
      >
        Questions
      </button>
    );
  }
}
