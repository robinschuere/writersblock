import React from 'react';
import PropTypes from 'prop-types';

import WithNavBar from '../components/hoc/withNavBar';

const About = ({ i18n }) => (
  <div className="container">
    <h4>{i18n.t('about.dev')}</h4>
    <p>{i18n.t('about.synopsis')}</p>
  </div>
);

About.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(About);
