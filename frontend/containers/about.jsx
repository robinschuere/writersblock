import React from 'react';
import PropTypes from 'prop-types';

import WithNavBar from '../components/hoc/withNavBar';
import AboutGenerator from '../components/about/aboutGenerator';

const About = ({ i18n }) => (
  <div className="container-fluid">
    <h4>{i18n.t('about.dev')}</h4>
    <p>{i18n.t('about.synopsis')}</p>
    <br />
    <AboutGenerator i18n={i18n} sectionName="tipsAndTricks" />
  </div>
);

About.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(About);
