import React from 'react';
import PropTypes from 'prop-types';

import ItemList from '../../components/itemList';
import WithNavBar from '../../components/hoc/withNavBar';

const Items = (props) => {
  const { i18n } = props;
  return (
    <div className="container-fluid">
      <h4>{i18n.t('item.list.header')}</h4>
      <ItemList {...props} />
    </div>
  );
};

Items.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Items);
