import React, { Component } from "react";

//Styles
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="ticket-container ">
        <div className="users aside"></div>
        <div className="tickets main"></div>
      </div>
    );
  }
}
