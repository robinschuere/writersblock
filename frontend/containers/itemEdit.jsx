/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import constants from '../constants';
import { getOptionsFromStorySetting } from '../helpers';
import { addItem, updateItem } from '../actions/item';


import Alert from '../components/generic/alert';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';
import WithNavBar from '../components/hoc/withNavBar';
import Label from '../components/generic/label';

const ItemEdit = ({
  computedMatch, itemStore, storySettingStore, dispatch, i18n,
}) => {
  const { storyId, itemId } = computedMatch.params;
  const item = !itemId ? {} : itemStore[itemId];

  const [name, setName] = useState(item.name);
  const [authorDescription, setAuthorDescription] = useState(item.authorDescription);
  const [description, setDescription] = useState(item.description);
  const [type, setType] = useState(item.type);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateItem = () => {
    if ([name, authorDescription].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const typeOptions = getOptionsFromStorySetting(
    storySettingStore, storyId, constants.storySetting.types.item.value,
  );

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateItem()) {
      const updatedItem = {
        ...item,
        name,
        authorDescription,
        type,
        description,
      };
      if (updatedItem.id) {
        await updateItem(updatedItem, dispatch);
      } else {
        await addItem({ ...updatedItem, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={itemId ? `/stories/${storyId}/items/${itemId}` : `/stories/${storyId}/items`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={addOrUpdate} onClose={() => setCompleted(true)} i18n={i18n} />
      <div className="container">
        {showAlert && <Alert message={i18n.t('item.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('item.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} onChange={setName} value={name} />
          <LabelAndField validatedOnce={validatedOnce} required type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          { typeOptions.length > 0
            ? <LabelAndField validatedOnce={validatedOnce} required type="select" label={i18n.t('generic.type')} options={typeOptions} onChange={setType} value={type} />
            : <Label level="warning" fieldLabel={i18n.t('item.edit.noStorySettingItems')} id="1" />
          }
          <LabelAndField validatedOnce={validatedOnce} required type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

ItemEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(ItemEdit);
