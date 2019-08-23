import React from 'react';
import PropTypes from 'prop-types';

import PlaceList from '../../components/placeList';
import WithNavBar from '../../components/hoc/withNavBar';

const Items = (props) => {
  const { i18n } = props;
  return (
    <div className="container">
      <h4>{i18n.t('place.list.header')}</h4>
      <p>{i18n.t('place.list.message')}</p>
      <PlaceList {...props} />
    </div>
  );
};

Items.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Items);
