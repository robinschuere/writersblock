import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => (rest.stores.userStore.loggedInUser ? <Component {...rest} /> : <Redirect to="/login" />)} />
);

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
