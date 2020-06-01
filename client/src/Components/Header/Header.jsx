import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-mainbg">
        <div className="navbar-brand navbar-logo">Navbar</div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>

            <li className="nav-item">
              <i className="fas fa-tachometer-alt"></i>Dashboard
            </li>
            <li className="nav-item active">
              <i className="far fa-address-book"></i>About Us
            </li>
            <li className="nav-item">
              <i className="far fa-clone"></i>Components
            </li>
            <li className="nav-item">
              <i className="far fa-calendar-alt"></i>Profile
            </li>
            <li className="nav-item">
              <i className="far fa-chart-bar"></i>Tickets
            </li>
            <li className="nav-item">
              <i className="far fa-copy"></i>Documents
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
