import React, { Component } from 'react';
import '../../style/reset.css';
import './Header.css';
import { FaSignInAlt } from 'react-icons/fa';
import logo from '../../images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-logo"><img src={logo} alt="oi" /></div>
        <div className="header-nav">
          <nav>
            <span>{this.props.username}</span>
            <a href="https://fast-939d3.web.app/sign-in/">
              <FaSignInAlt className="nav-icon-logout" />
              Logout
            </a>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
