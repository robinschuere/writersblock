import React from 'react';
import PropTypes from 'prop-types';

import Button from './generic/button';

const StoryBoardBar = ({ computedMatch, component, mobile }) => {
  const { storyId } = computedMatch.params;
  if (mobile) {
    return component;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 px-1 bg-dark position-fixed" id="sticky-sidebar">
          <Button linkTo={`/stories/${storyId}/edit`}>General data</Button>
          <Button linkTo={`/stories/${storyId}/chapters`}>chapters</Button>
        </div>
        <div className="col offset-3" id="main">
          {component}
        </div>
      </div>
    </div>
  );
};

StoryBoardBar.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  component: PropTypes.node.isRequired,
  mobile: PropTypes.object.isRequired,
};

export default StoryBoardBar;
