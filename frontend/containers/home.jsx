import React from 'react';
import PropTypes from 'prop-types';

import withNavBar from '../components/hoc/withNavBar';

const Home = ({ i18n }) => (
  <div className="container-fluid">
    <h4>{i18n.t('generic.app')}</h4>
    <p>{i18n.t('home.p1')}</p>
    <p>{i18n.t('home.p2')}</p>
    <p>{i18n.t('home.p3')}</p>
    <p>{i18n.t('home.p4')}</p>
    <p>{i18n.t('home.p5')}</p>
    <p>{i18n.t('home.p6')}</p>
    <p>{i18n.t('home.p7')}</p>
    <p>{i18n.t('home.p8')}</p>
    <p>{i18n.t('home.p9')}</p>
    <p>{i18n.t('home.p10')}</p>
    <p>{i18n.t('home.p11')}</p>
    <p>{i18n.t('home.p12')}</p>
    <p>{i18n.t('home.p13')}</p>
    <p>{i18n.t('home.p14')}</p>
    <p>{i18n.t('home.p15')}</p>
  </div>
);

Home.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default withNavBar(Home);
