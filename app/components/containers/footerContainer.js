import React from 'react';
import { Link } from 'react-router-dom';

class FooterContainer extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to='/contact'> Contact</Link>
          </div>
        </div>
      </nav >
    );
  }
}

export default FooterContainer;
