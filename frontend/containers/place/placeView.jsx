import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndEditBar from '../../components/backAndEditBar';
import StorySettingLabel from '../../components/storySettingLabel';

const Place = (props) => {
  const {
    computedMatch, withAuthorDescription, placeStore, history, i18n, mobile,
  } = props;
  const { storyId, placeId } = computedMatch.params;
  const place = placeStore[placeId];
  const [completed, setCompleted] = useState(false);

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/places/${placeId}/edit`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/places`} />;
  }

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleChangeCharacter}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        <form className="form-horizontal">
          <h5>{i18n.t('place.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={place.name} />
          {withAuthorDescription && (
            <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={place.authorDescription} />
          )}
          <StorySettingLabel {...props} storyId={storyId} type="placeType" value={place.type} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={place.description} />
        </form>
      </div>
    </Fragment>
  );
};

Place.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  placeStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Place));
