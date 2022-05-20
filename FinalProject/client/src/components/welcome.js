import React from "react";
import Login from "./login";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome_text">
        <h1>Welcome to FakeStackOverflow</h1>
      </div>
      <Login />
    </div>
  );
};

export default Welcome;
