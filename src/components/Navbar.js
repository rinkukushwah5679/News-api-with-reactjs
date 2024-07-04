import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
  isActive = (path) => {
    return this.props.location.pathname === path;
  };
  // isActive = (path) => {
  //   return window.location.pathname === path;
  // };

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/') ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/about') ? 'active' : ''}`} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/business') ? 'active' : ''}`} to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/entertainment') ? 'active' : ''}`} to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/health') ? 'active' : ''}`} to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/science') ? 'active' : ''}`} to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/sports') ? 'active' : ''}`} to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive('/technology') ? 'active' : ''}`} to="/technology">Technology</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
