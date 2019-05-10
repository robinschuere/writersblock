import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StoryBoardBar = ({ computedMatch }) => {
  const { storyId } = computedMatch.params;
  return (
    <Fragment>
      <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={`/stories/${storyId}/edit`}>General data</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/stories/${storyId}/chapters`}>Chapters</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

StoryBoardBar.propTypes = {
  computedMatch: PropTypes.object.isRequired,
};

export default StoryBoardBar;
