import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar({ isOpen, setIsOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Nduna AI" className="logo-icon" />
          <div className="logo-text">
            <span className="logo-brand">Nduna AI</span>
            <span className="logo-tagline">Enterprise AI Integration</span>
          </div>
        </Link>

        <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li>
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">Projects</Link>
          </li>
          <li>
            <Link to="/team" className="nav-link">Team</Link>
          </li>
          <li>
            <Link to="/analytics" className="nav-link">Analytics</Link>
          </li>
          <li>
            <Link to="/agent" className="nav-link">AI Agent</Link>
          </li>
          <li className="nav-contact">
            <a href="mailto:nathi@nduna.site" className="nav-link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
