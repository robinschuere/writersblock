import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addPlace, updatePlace } from '../../actions/place';
import { useField } from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import StorySettingSelect from '../../components/storySettingSelect';

const PlaceEdit = (props) => {
  const {
    computedMatch, withAuthorDescription, placeStore, dispatch, i18n, mobile,
  } = props;
  const { storyId, placeId } = computedMatch.params;
  const place = !placeId ? {} : placeStore[placeId];

  const [updatedPlace, setPlaceProps] = useField(place);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validate = () => {
    if ([updatedPlace.name].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
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
    return <Redirect to={`/stories/${storyId}/places`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        {showAlert && <Alert message={i18n.t('place.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('place.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setPlaceProps('name')} />
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setPlaceProps('authorDescription')} />
          )}
          <StorySettingSelect {...props} validatedOnce={validatedOnce} storyId={storyId} type="placeType" {...setPlaceProps('type')} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} {...setPlaceProps('description')} />
        </form>
      </div>
    </Fragment>
  );
};

PlaceEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  placeStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(PlaceEdit);
