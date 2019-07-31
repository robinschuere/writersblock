import React from 'react';
import PropTypes from 'prop-types';

import withNavBar from '../components/hoc/withNavBar';

const Home = ({ i18n }) => (
  <div className="container">
    <h4>{i18n.t('generic.app')}</h4>
    <p>{i18n.t('generic.underDevelopment')}</p>
  </div>
);

Home.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default withNavBar(Home);
