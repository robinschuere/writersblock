import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Select from './generic/select';
import { updateUser } from '../actions/user';
import { getLanguages } from '../helpers';

const NavBar = (props) => {
  const {
    userStore, dispatch, language, i18n, changeLanguage,
  } = props;
  const user = userStore.loggedInUser;

  const [collapsed, setCollapsed] = useState(true);

  const toggleOff = () => {
    setCollapsed(true);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLanguageChange = async (value) => {
    if (user) {
      await updateUser({ ...user, language: value }, dispatch);
    } else {
      changeLanguage(value);
    }
  };

  return (
    <Fragment>
      <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggle} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="navbar-brand" to="/">{i18n.t('generic.app')}</Link>

          <div className={collapsed ? 'collapse navbar-collapse' : 'collapse-in navbar-collapse'}>
            <ul className="navbar-nav mr-auto">
              {!!user && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={toggleOff} to="/stories">{i18n.t('navigation.stories')}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={toggleOff} to="/user">{userStore.loggedInUser.userName}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={toggleOff} to="/logout">{i18n.t('navigation.logout')}</Link>
                  </li>
                </Fragment>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" onClick={toggleOff} to="/login">{i18n.t('navigation.login')}</Link>
                </li>
              )}
              <li className="nav-item dropdown">
                <Select options={getLanguages()} value={language} onChange={handleLanguageChange} />
              </li>
            </ul>
          </div>

        </nav>
      </div>
    </Fragment>
  );
};

NavBar.propTypes = {
  userStore: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

export default NavBar;
