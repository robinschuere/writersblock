import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getBreadCrumbPaths } from '../helpers';

const StoryBoardBar = ({
  computedMatch, i18n,
}) => {
  const breadCrumbs = getBreadCrumbPaths(computedMatch);
  if (breadCrumbs && breadCrumbs.length > 0) {
    return (
      <nav>
        <ol className="breadcrumb">
          {breadCrumbs.map(b => (
            <li className="breadcrumb-item">
              <Link to={b.path}>
                {i18n.t(`navigation.breadCrumbs.${b.name}`)}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    );
  }
  return null;
};

StoryBoardBar.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default StoryBoardBar;
