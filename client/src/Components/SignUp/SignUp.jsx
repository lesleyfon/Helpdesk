import React, { Component } from "react";
import { IoIosPerson, IoMdLock, IoIosPhonePortrait } from "react-icons/io";

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
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      error: { status, message },
    } = this.state;
    return (
      <div className="form-fields">
        <div className="input-fields">
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

        <div className="login-button">Sign-Up</div>
      </div>
    );
  }
}
