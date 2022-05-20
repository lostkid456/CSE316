import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const [success, setSuccess] = React.useState(true);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const newGuest = async () => {
    try {
      await api.guest_login();
      setEmail("");
      setPwd("");
      navigate("/guest");
    } catch (err) {
      setErrMsg(err.message);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let user = { email: email, password: pwd };
      const response = await api.user_login(user);
      if (!response.data) {
        setErrMsg("Invalid Credentials");
        setSuccess(false);
      } else {
        setEmail("");
        setPwd("");
        setSuccess(true);
        navigate("/user");
      }
    } catch (err) {
      setErrMsg(err.message + " / Server Connection Issue");
      setSuccess(false);
    }
  };

  return (
    <div style={{ width: "25%" }}>
      <form onSubmit={handleSubmit}>
        <div className="welcome_form">
          <div className={success ? "offscreen" : "error_message"}>
            <span style={{ color: "red" }}>{errMsg}</span>
          </div>
          <h2>Login</h2>
          <label>Email:</label>
          <div className="inner_form">
            <input
              className="form_input"
              autoComplete="off"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>
          </div>
          <label>Password:</label>
          <div className="inner_form">
            <input
              type={"password"}
              className="form_input"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            ></input>
          </div>
          <div>
            <button style={{ fontSize: "18px" }}>Log in</button>
          </div>
          <div className="button_grid">
            <Link to={"/signup"}>
              <button
                style={{ background: "None", textDecoration: "underline" }}
              >
                Sign Up
              </button>
            </Link>
            <button
              style={{
                background: "none",
                textDecoration: "underline",
              }}
              onClick={newGuest}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
