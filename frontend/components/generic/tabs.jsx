/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import navigationActions from '../../actions/navigation';

const Tabs = ({
  activeTab, setActiveTab, tabValues, computedMatch, dispatch,
}) => {
  const { path } = computedMatch || {};
  const handleSetActiveTab = (tabName) => {
    if (dispatch && computedMatch) {
      navigationActions(path, tabName, dispatch);
    }
    setActiveTab(tabName);
  };

  return (
    <Fragment>
      <ul className="nav nav-tabs">
        {tabValues.map(t => (
          <li key={t.tabName} className="nav-item">
            <a className={`nav-link ${t.tabName === activeTab ? 'active' : ''}`} onClick={() => handleSetActiveTab(t.tabName)}>
              {t.tabName}
            </a>
          </li>
        ))}
      </ul>
      <br />
      {tabValues.find(t => t.tabName === activeTab).render()}
    </Fragment>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabValues: PropTypes.arrayOf(PropTypes.shape({
    tabName: PropTypes.string,
    render: PropTypes.func,
  })).isRequired,
  computedMatch: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Tabs;
