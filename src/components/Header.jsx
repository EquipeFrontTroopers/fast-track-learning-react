import React, { Component } from 'react';
import './reset.css';
import './Header.css';
import { GrLogout } from 'react-icons/gr';
import logo from '../images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-logo"><img src={logo} alt="oi" /></div>
        <div className="header-nav">
          <nav>
            <a href="/html/">Username</a>
            <a href="/html/">
              <GrLogout className="nav-icon-logout" />
              Logout
            </a>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
