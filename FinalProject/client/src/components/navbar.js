import React, { useState } from "react";
import Dropdown from "./dropdown";

const Navbar = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdown_clicked = () => {
    setDropdown(!dropdown);
  };
  const logout = () => {
    props.signout();
  };
  const login = () => {
    props.signin();
  };
  const question_click = () => {
    props.changePage("q");
  };
  const tag_click = () => {
    props.changePage("t");
  };
  const query = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        props.query(e.target.value);
        e.target.value = "";
      }
    }
  };
  const profile = () => {
    props.profile();
  };
  const page = props.page;
  return (
    <div className="banner" id="banner">
      <button
        style={{
          float: "left",
          width: "12.5%",
          backgroundColor: page === "q" ? "#0281E8" : "lightgrey",
        }}
        onClick={question_click}
      >
        Questions
      </button>
      <button
        style={{
          float: "left",
          width: "12.5%",
          backgroundColor: page === "t" ? "#0281E8" : "lightgrey",
        }}
        onClick={tag_click}
      >
        Tags
      </button>
      <h1 style={{ width: "50%", paddingLeft: "20%" }}>Fake Stack Overflow</h1>
      <input
        type={"text"}
        style={{ width: "25%", margin: "25px", height: "30%" }}
        placeholder="Search"
        onKeyDown={query}
      ></input>
      <div
        className="dropdown_container"
        style={{ height: "30%" }}
        onClick={dropdown_clicked}
      >
        Options
        {dropdown && (
          <Dropdown
            logout={logout}
            login={login}
            profile={profile}
            page={page}
            user={props.user}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
