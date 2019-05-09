import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import constants from '../constants';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';

const message = `
After logging out, you will be redirected to the home page.
`;

const Logout = ({ dispatch }) => {
  const [completed, setCompleted] = useState(false);
  const handleLogout = () => {
    dispatch({ type: constants.actions.logoutUser });
    dispatch({ type: constants.actions.emptyStories });
    setCompleted(true);
  };

  if (completed) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h4>Logout</h4>
      <p>{message}</p>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default WithNavBar(Logout);
