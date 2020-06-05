import React, { Component } from "react";

//Component
import Users from "../../Components/Users.js/UsersList";
import TicketList from "../../Components/Ticket/TicketList";

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
        <div className="tickets main">
          <TicketList />
        </div>
      </div>
    );
  }
}
