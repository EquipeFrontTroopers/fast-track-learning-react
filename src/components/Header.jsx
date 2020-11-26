import React from 'react';
import './Header.css';
import { GrLogout } from 'react-icons/gr';
import logo from '../images/logo.png';

export default function Header() {
  return (
    <div className="Header">
      <div className="Header_logo">
        <img src={logo} className="Logo" alt="logo" />
      </div>

      <nav className="Nav">
        <ul>
          <p>USERNAME</p>
          <li>
            <button type="button">
              <GrLogout />
              LOGOUT
            </button>

          </li>
        </ul>

      </nav>
    </div>
  );
}
