import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => <Component {...rest} />} />
);

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default PublicRoute;
