import React from "react";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyPress=this.onKeyPress.bind(this);
  }

  onKeyPress(e){
    if(e.charCode===13){
      if(e.target.value){
        this.props.onSearch(e.target.value);
        e.target.value="";
      }
    }
  }

  render() {
    return (
      <input
        style={{ float: "right", width: "25%", margin: "25px", height: "30%" }}
        type={"text"}
        placeholder="Search"
        onKeyPress={this.onKeyPress}
      ></input>
    );
  }
}
