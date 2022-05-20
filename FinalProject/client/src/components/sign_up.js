import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).{8,100}$/;

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [matchpwd, setMatchPwd] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(true);

  const [userError, setUserError] = React.useState("");
  const [validUser, setValidUser] = React.useState(true);

  const [vPError, setvPError] = React.useState("");
  const [validPwd, setValidPwd] = React.useState(true);

  const [substrError, setsubStrError] = React.useState("");
  const [substrPwd, setSubstrPwd] = React.useState(true);

  const [matchingError, setMatchingError] = React.useState("");
  const [matchingPwd, setMatchningPwd] = React.useState(true);

  const [otherErrors, setOtherErrors] = React.useState("");
  const [success, setSuccess] = React.useState(true);

  useEffect(() => {
    setEmailError("");
  }, [user, pwd, email, matchpwd]);

  useEffect(() => {
    setUserError("");
  }, [user, pwd, email, matchpwd]);

  useEffect(() => {
    setvPError("");
  }, [user, pwd, email, matchpwd]);

  useEffect(() => {
    setsubStrError("");
  }, [user, pwd, email, matchpwd]);

  useEffect(() => {
    setMatchingError("");
  }, [user, pwd, email, matchpwd]);

  const goBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var count = 0;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Invalid Email format");
      if (validEmail) setValidEmail(false);
      count += 1;
    }
    if (!user.trim() || user.length === 0) {
      setUserError("Username cannot be empty");
      if (validUser) setValidUser(false);
      count += 1;
    }
    if (!PWD_REGEX.test(pwd)) {
      setvPError(
        "Invalid Password. Passwords must be at least 8 characters in length, and also have at least 1 capital letter, 1 number, and 1 special character"
      );
      if (validPwd) setValidPwd(false);
      count += 1;
    }
    if (pwd.includes(user) || pwd.includes(email.split("@")[0])) {
      setsubStrError("Password cannot include username or email id");
      if (substrPwd) setSubstrPwd(false);
      count += 1;
    }
    if (pwd !== matchpwd) {
      setMatchingError("Passwords dont match");
      if (matchingPwd) setMatchningPwd(false);
      count += 1;
    }
    if (count === 0) {
      try {
        let message = await api.check_email_exists(email);
        if (message.data.length > 0) {
          setOtherErrors("Email already exists");
          setSuccess(false);
        } else {
          let new_user = {
            user: user,
            email: email,
            password: pwd,
          };
          await api.create_new_user(new_user);
          navigate("/");
        }
      } catch (err) {
        setOtherErrors("Something went wrong communicating with server");
        setSuccess(false);
      }
    }
  };

  return (
    <div className="sign_up">
      <div className="sign_up_text">
        <h1>FakeStackOverflow</h1>
      </div>
      <div style={{ width: "25%" }}>
        <div className={success ? "offscreen" : "error_state"}>
          <span style={{ color: "red" }}>{otherErrors}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="sign_up_form">
            <label>Email</label>
            <div className="inner_form">
              <input
                type="text"
                className="form_input"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className={validEmail ? "offscreen" : "error_state"}>
                <span style={{ color: "red" }}>{emailError}</span>
              </div>
            </div>
            <label>Username</label>
            <div className="inner_form">
              <input
                type="text"
                className="form_input"
                id="username"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
              ></input>
              <div className={validUser ? "offscreen" : "error_state"}>
                <span style={{ color: "red" }}>{userError}</span>
              </div>
            </div>
            <label>Password</label>
            <div className="inner_form">
              <input
                type="password"
                className="form_input"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
              ></input>
              <div className={validPwd ? "offscreen" : "error_state"}>
                <span style={{ color: "red" }}>{vPError}</span>
              </div>
              <div className={substrPwd ? "offscreen" : "error_state"}>
                <span style={{ color: "red" }}>{substrError}</span>
              </div>
            </div>
            <label>Reenter Password</label>
            <div className="inner_form">
              <input
                type="password"
                className="form_input"
                id="matchPwd"
                autoComplete="off"
                onChange={(e) => setMatchPwd(e.target.value)}
              ></input>
              <div className={matchingPwd ? "offscreen" : "error_state"}>
                <span style={{ color: "red" }}>{matchingError}</span>
              </div>
            </div>
            <div>
              <button style={{ fontSize: "18px" }}>Sign up</button>
              <button
                style={{ fontSize: "18px", marginLeft: "20%" }}
                onClick={goBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
