import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleOff = () => {
    setCollapsed(true);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggle} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <Link className="navbar-brand" to="/">
          Writersblock
          <small> ~ Writing your story ~ </small>
        </Link>

        <div className={collapsed ? 'collapse navbar-collapse' : 'collapse-in navbar-collapse'}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" onClick={toggleOff} to="/stories">Stories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={toggleOff} to="/login">Login</Link>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  );
};

export default NavBar;
