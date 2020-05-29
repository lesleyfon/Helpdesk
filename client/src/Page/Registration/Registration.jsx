import React, { Component } from "react";

//Components
import LogIn from "../../Components/LogIn/LogIn";
import SignUp from "../../Components/SignUp/SignUp";

//styles
import "./Registration.css";

export default class Registration extends Component {
  state = {
    login: false,
  };
  render() {
    const { login } = this.state;

    return (
      <div className="registration-container">
        <div className="registration-wrapper">
          <div className="registration-header">
            {login ? "Member Login" : "Member Registration"}
          </div>
          <div className="registration-main">
            {login ? <LogIn {...this.props} /> : <SignUp {...this.props} />}
          </div>
          <div
            className="registration-footer"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "Create an Account" : "Login"}
          </div>
        </div>
      </div>
    );
  }
}
