import React, { Component } from "react";

//Components
import LogIn from "../../Components/LogIn/LogIn";
import SignUp from "../../Components/SignUp/SignUp";

export default class Registration extends Component {
  state = {
    login: true,
  };
  render() {
    const { login } = this.state;

    return (
      <div className="registration-container">
        <div className="registration-header">
          {login ? "Member Login" : "member Registration"}
        </div>
        <div className="registration-main">
          {login ? <LogIn /> : <SignUp />}
        </div>
        <div
          className="registration-footer"
          onClick={() => this.setState({ login: !login })}
        >
          {login ? "Create an Account" : "Login"}
        </div>
      </div>
    );
  }
}
