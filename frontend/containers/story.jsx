import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LabelAndText from '../components/generic/labelAndText';
import withNavBar from '../components/hoc/withNavBar';

const Story = ({
  computedMatch, storyStore,
}) => {
  const { storyId } = computedMatch.params;
  const story = storyStore[storyId];

  return (
    <Fragment>
      <div className="container">
        <h3>{`Story ${story.name}`}</h3>
        <h4>General data</h4>
        <form className="form-horizontal">
          <LabelAndText type="text" label="Name" value={story.name} />
          <LabelAndText type="text" label="Description" value={story.description} />
        </form>
      </div>
    </Fragment>
  );
};

Story.propTypes = {
  storyStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
};

export default withNavBar(Story);
