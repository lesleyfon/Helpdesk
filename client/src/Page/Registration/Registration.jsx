import React, { Component } from "react";

//Components
import LogIn from "../../Components/LogIn/LogIn";
import SignUp from "../../Components/SignUp/SignUp";

import styled from "styled-components";

export default class Registration extends Component {
  state = {
    login: true,
  };
  render() {
    const { login } = this.state;

    return (
      <DIV className="registration-container">
        <div className="registration-header">
          {login ? "Member Login" : "Member Registration"}
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
      </DIV>
    );
  }
}

const DIV = styled.div`
  width: 550px;
  background: #f1f7fc;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  .registration-header {
    background-color: #333c46;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fcffff;
    font-weight: bolder;
    font-size: 1.28rem;
  }

  .registration-footer {
    margin-bottom: 70px;
  }
`;
