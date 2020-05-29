import React, { Component } from "react";
//Icons
import { IoIosPerson, IoMdLock } from "react-icons/all";

// graphQl imports
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

//Styled component => deleted this later
import styled from "styled-components";

export default class LogIn extends Component {
  state = {
    email: "",
    password: "",
    error: {
      status: false,
      message: "",
    },
  };
  render() {
    const {
      email,
      password,
      error: { status, message },
    } = this.state;

    const LOGIN_MUTATION = gql`
      mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            email
            first_name
            last_name
            email
            phone_number
          }
        }
      }
    `;
    return (
      <DIV>
        <div className="user-email input-fields">
          <IoIosPerson />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </div>
        <div className="user-password input-fields">
          <IoMdLock />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
        </div>
        {status && <p>{message}</p>}
        <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email, password }}
          onCompleted={(data) => {
            this._authoriedUser(data);
            this.setState({
              email: "",
              password: "",
            });
          }}
          onError={(error) => {
            this.setState({
              error: {
                message: error.message.split(":")[1],
                status: true,
              },
            });
          }}
        >
          {(mutation) => (
            <div className="login-button" onClick={mutation}>
              Login
            </div>
          )}
        </Mutation>
      </DIV>
    );
  }

  _authoriedUser(data) {
    console.log(data);
    console.log(this.props);
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
    padding-bottom: 5px;
  }
  .input-fields svg {
    width: 10%;
    height: 30px;
    background-color: #e1e9f0;
    padding: 6px;
  }
  .input-fields input {
    width: 80%;
    height: 40px;
    margin: 0px;
    background-color: #e1e9f0;
    border: 0px;
    font-size: 1.3rem;
    padding-left: 10px;
  }

  .input-fields input:focus {
    outline: none;
  }

  .login-button {
    width: 60%;
    height: 45px;
    margin: 0 auto;
    text-align: center;
    background-color: #32bad6;
    line-height: 45px;
    font-weight: 200px;
    margin-top: 20px;
  }
`;
