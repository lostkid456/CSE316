import React, { useState } from "react";

const Dropdown = (props) => {
  const [clicked, setClicked] = useState(false);
  const onDropdownClick = () => setClicked(!clicked);
  const logoutClick = () => {
    return props.logout();
  };
  const profileClick = () => {
    return props.profile();
  };
  const loginClick = () => {
    return props.login();
  };
  if (props.user) {
    return (
      <div>
        <ul
          onClick={onDropdownClick}
          className={clicked ? "dropdown_clicked" : "dropdown_menu"}
        >
          <li key={0}>
            <button style={{ width: "100%" }} onClick={profileClick}>
              Profile
            </button>
          </li>
          <li key={1}>
            <button style={{ width: "100%" }} onClick={logoutClick}>
              Log out
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul
          onClick={onDropdownClick}
          className={clicked ? "dropdown_clicked" : "dropdown_menu"}
        >
          <li key={0}>
            <button style={{ width: "100%" }} onClick={loginClick}>
              Log In
            </button>
          </li>
        </ul>
      </div>
    );
  }
};

export default Dropdown;
