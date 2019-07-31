import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeItem } from '../actions/item';

import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const Item = ({
  computedMatch, itemStore, dispatch, i18n,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, itemId } = computedMatch.params;
  const item = itemStore[itemId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeItem(item, dispatch);
    handleClose();
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/items`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('item.delete.header', { title: `${item.firstName} ${item.lastName}` })}</h4>
        <p>{i18n.t('item.delete.message')}</p>
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  dispatch: PropTypes.func.isRequired,
  itemStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Item);
