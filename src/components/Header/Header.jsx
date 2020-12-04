import React, { Component } from 'react';
import '../../style/reset.css';
import './Header.css';
import { FaSignInAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import logo from '../../images/logo.png';

class Header extends Component {
  logout() {
    Swal
      .fire({
        title: 'Deseja realmente fazer logout?',
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Não',
        cancelButtonColor: 'orange',
        confirmButtonText: 'Sim',
        confirmButtonColor: 'red',
      })
      .then((value) => {
        if (value.isConfirmed) {
          window.location.href = 'https://fast-939d3.web.app/sign-in/';
        }
      });
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-logo"><img src={logo} alt="oi" /></div>
        <div className="header-nav">
          <nav>
            <span>{this.props.username}</span>
            <button type="button" onClick={this.logout.bind(this)}>
              <FaSignInAlt className="nav-icon-logout" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
