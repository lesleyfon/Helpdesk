import React, { Component } from "react";
import { IoIosPerson, IoMdLock, IoIosPhonePortrait } from "react-icons/io";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//Constants
import { AUTH_TOKEN } from "./../../constants";

export default class SignUp extends Component {
  state = {
    first_name: "",
    last_name: "",
    password: "",
    phone_number: "",
    email: "",
    error: {
      status: false,
      message: "'",
    },
  };

  render() {
    //destructure State
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      error: { status, message },
    } = this.state;

    // Query Builder
    const SIGN_UP_MUTATION = gql`
      mutation Sign_UpMutation(
        $first_name: String!
        $last_name: String!
        $password: String!
        $email: String!
        $phone_number: String
      ) {
        signup(
          first_name: $first_name
          last_name: $last_name
          password: $password
          email: $email
          phone_number: $phone_number
        ) {
          token
          user {
            first_name
            last_name
            email
            phone_number
          }
        }
      }
    `;
    return (
      <div className="form-fields">
        <div className="input-fields" id="signup-input-id">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={(event) =>
              this.setState({ first_name: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(event) =>
              this.setState({ last_name: event.target.value })
            }
          />
        </div>

        <div className="input-fields">
          <IoIosPhonePortrait />
          <input
            type="tel"
            placeholder="Tel: 123-45-678"
            value={phone_number}
            name="phone_number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(event) =>
              this.setState({ phone_number: event.target.value })
            }
          />
        </div>

        <div className="input-fields">
          <IoIosPerson />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </div>
        <div className="input-fields">
          <IoMdLock />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
        </div>

        {status && <p className="registration-error">{message}</p>}
        <Mutation
          mutation={SIGN_UP_MUTATION}
          variables={{ first_name, last_name, email, password, phone_number }}
          onCompleted={(data) => this._authUser(data)}
          onError={(error) => {
            this.setState({
              error: {
                status: !status,
                message: error.message.split(":")[1],
              },
            });
          }}
        >
          {(mutation) => (
            <div className="login-button" onClick={mutation}>
              Sign-Up
            </div>
          )}
        </Mutation>
      </div>
    );
  }

  _authorizedUser(data) {
    const { token } = data;
    localStorage.setItem(AUTH_TOKEN, token);
    this.props.history.push("/home");
  }
}
