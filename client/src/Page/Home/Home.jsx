import React, { Component } from "react";

//Component
import Users from "../../Components/Users.js/UsersList";

//Styles
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="ticket-container ">
        <div className="users aside">
          {" "}
          <Users />
        </div>
        <div className="tickets main"></div>
      </div>
    );
  }
}
