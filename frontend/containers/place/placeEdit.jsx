import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addPlace, updatePlace } from '../../actions/place';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import StorySettingSelect from '../../components/storySettingSelect';

const PlaceEdit = (props) => {
  const {
    computedMatch, placeStore, storySettingStore, dispatch, i18n, mobile,
  } = props;
  const { storyId, placeId } = computedMatch.params;
  const place = !placeId ? {} : placeStore[placeId];

  const [name, setName] = useState(place.name);
  const [authorDescription, setAuthorDescription] = useState(place.authorDescription);
  const [description, setDescription] = useState(place.description);
  const [type, setType] = useState(place.type);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validatePlace = () => {
    if ([name].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validatePlace()) {
      const updatedPlace = {
        ...place,
        name,
        authorDescription,
        type,
        description,
      };
      if (updatedPlace.id) {
        await updatePlace(updatedPlace, dispatch);
      } else {
        await addPlace({ ...updatedPlace, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={placeId ? `/stories/${storyId}/places/${placeId}` : `/stories/${storyId}/places`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        {showAlert && <Alert message={i18n.t('place.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('place.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} onChange={setName} value={name} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <StorySettingSelect validatedOnce={validatedOnce} storyId={storyId} type="placeType" i18n={i18n} storySettingStore={storySettingStore} onChange={setType} value={type} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

PlaceEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(PlaceEdit);
