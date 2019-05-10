import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
  const { userStore } = props;
  const [collapsed, setCollapsed] = useState(true);

  const user = !!userStore.loggedInUser;

  const toggleOff = () => {
    setCollapsed(true);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggle} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="navbar-brand" to="/">Writersblock</Link>

          <div className={collapsed ? 'collapse navbar-collapse' : 'collapse-in navbar-collapse'}>
            <ul className="navbar-nav mr-auto">
              {user && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={toggleOff} to="/stories">Stories</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={toggleOff} to="/user">{userStore.loggedInUser.userName}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={toggleOff} to="/logout">Logout</Link>
                  </li>
                </Fragment>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" onClick={toggleOff} to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>

        </nav>
      </div>
    </Fragment>
  );
};

NavBar.propTypes = {
  userStore: PropTypes.object.isRequired,
};

export default NavBar;
