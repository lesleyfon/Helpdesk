import React, { Component } from "react";
//Icons
import { IoIosPerson, IoMdLock } from "react-icons/all";

import styled from "styled-components";

export default class LogIn extends Component {
  render() {
    return (
      <DIV>
        <div className="user-email input-fields">
          <IoIosPerson />
          <input />
        </div>
        <div className="user-password input-fields">
          <IoMdLock />
          <input />
        </div>
      </DIV>
    );
  }
}

const DIV = styled.div`
  margin-top: 50px;
  .input-fields {
    width: 60%;
    margin: 0 auto;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
  .input-fields svg {
    width: 10%;
    height: 30px;
    background-color: #e1e9f0;
    padding: 6px;
  }
  .input-fields input {
    width: 83%;
    height: 40px;
    margin: 0px;
    background-color: #e1e9f0;
    border: 0px;
    font-size: 1.3rem;
  }

  .input-fields input:focus {
    outline: none;
  }
`;
