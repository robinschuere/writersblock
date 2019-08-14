import React from 'react';
import PropTypes from 'prop-types';

import constants from '../constants';
import WithNavBar from '../components/hoc/withNavBar';
import VersionGenerator from '../components/version/versionGenerator';

const Version = ({ i18n }) => (
  <div className="container">
    <h4>{i18n.t('version.title')}</h4>
    <br />
    {constants.releaseNotes.map(v => (<VersionGenerator i18n={i18n} fileName={v} />))}

  </div>
);

Version.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Version);
