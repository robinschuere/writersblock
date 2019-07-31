import React from 'react';
import PropTypes from 'prop-types';

import WithNavBar from '../components/hoc/withNavBar';

const Contact = ({ i18n }) => (
  <div className="container">
    <h4>{i18n.t('contact.header')}</h4>
    <p>{i18n.t('contact.message')}</p>
  </div>
);

Contact.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Contact);
