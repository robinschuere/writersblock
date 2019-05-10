import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <nav className="navbar fixed-bottom navbar-dark bg-dark">
    <Link className="navbar-brand" to="/contact">Contact</Link>
    <Link className="navbar-brand" to="/about">About</Link>
  </nav>
);

export default Footer;
