import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./welcome";
import SignUp from "./sign_up";
import User from "./user";
import Guest from "./guest";
import Nowhere from "./nowhere";

const FakeStackOverflow = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/signup" exact element={<SignUp />} />

        <Route path="/user" exact element={<User />} />
        <Route path="/guest" exact element={<Guest />} />

        <Route path="*" exact element={<Nowhere />} />
      </Routes>
    </BrowserRouter>
  );
};

export default FakeStackOverflow;
