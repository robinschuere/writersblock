import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Footer = ({ i18n }) => (
  <nav className="navbar fixed-bottom navbar-dark bg-dark">
    <Link className="navbar-brand" to="/contact">{i18n.t('navigation.contact')}</Link>
    <Link className="navbar-brand" to="/about">{i18n.t('navigation.about')}</Link>
  </nav>
);

Footer.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default Footer;
