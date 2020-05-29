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
        <div className="registration-wrapper">
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
        </div>
      </DIV>
    );
  }
}

const DIV = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .registration-wrapper {
    width: 550px;
    background: #f1f7fc;
    margin-top: 100px;
  }
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
