import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import constants from '../../constants';

import Button from '../../components/generic/button';
import WithNavBar from '../../components/hoc/withNavBar';

const Logout = ({
  dispatch, i18n,
}) => {
  const [completed, setCompleted] = useState(false);
  const handleLogout = () => {
    dispatch({ type: constants.actions.logoutUser });
    dispatch({ type: constants.actions.emptyStories });
    dispatch({ type: constants.actions.emptyChapters });
    dispatch({ type: constants.actions.emptyStorySettings });
    setCompleted(true);
  };

  if (completed) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h4>{i18n.t('logout.header')}</h4>
      <p>{i18n.t('logout.message')}</p>
      <Button onClick={handleLogout}>
        {i18n.t('logout.header')}
      </Button>
    </div>
  );
};

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Logout);
