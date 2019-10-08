import React from 'react';
import PropTypes from 'prop-types';

import PowerList from '../../components/powerList';
import WithNavBar from '../../components/hoc/withNavBar';

const Powers = (props) => {
  const { i18n } = props;
  return (
    <div className="container-fluid">
      <h4>{i18n.t('power.list.header')}</h4>
      <PowerList {...props} />
    </div>
  );
};

Powers.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Powers);
