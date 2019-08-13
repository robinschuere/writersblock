/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateUser } from '../actions/user';
import constants from '../constants';
import { getLanguages } from '../helpers';
import Icon from './generic/icon';
import StoryBoardBar from './storyBoardBar';

const NavBar = (props) => {
  const {
    userStore, dispatch, language, i18n, changeLanguage, computedMatch, storyStore,
  } = props;
  const user = userStore.loggedInUser;

  const [collapsed, setCollapsed] = useState(true);
  const [languageState, setLanguageState] = useState(false);

  const toggleOff = () => {
    setCollapsed(true);
    setLanguageState(false);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleLanguage = () => {
    setLanguageState(!languageState);
  };

  const handleLanguageChange = async (value) => {
    if (user) {
      await updateUser({ ...user, language: value }, dispatch);
    } else {
      changeLanguage(value);
    }
  };

  const updateLanguage = (value) => {
    toggleOff();
    handleLanguageChange(value);
  };

  const renderLanguages = () => {
    const languages = getLanguages().map(l => (
      <a className="dropdown-item" onClick={() => updateLanguage(l.value)}>
        {language === l.value && <Icon name="check" />}
        {` ${l.label}`}
      </a>
    ));
    return languages;
  };

  const showStoryBoard = constants.routesWithStoryBoard.includes(computedMatch.path);

  return (
    <Fragment>
      <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" onClick={toggle}>
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
              <li className={`nav-item dropdown ${languageState ? 'show' : ''}`}>
                <a className="nav-link dropdown-toggle" onClick={toggleLanguage}>
                  {i18n.t('user.language')}
                </a>
                {languageState && (
                  <Fragment>
                    <div className="dropdown-menu show">
                      {renderLanguages()}
                    </div>
                  </Fragment>
                )}

              </li>
            </ul>
          </div>

        </nav>
        {showStoryBoard && (
          <StoryBoardBar
            computedMatch={computedMatch}
            storyStore={storyStore}
            i18n={i18n}
          />
        )}
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
  computedMatch: PropTypes.object.isRequired,
  storyStore: PropTypes.object.isRequired,
};

export default NavBar;
