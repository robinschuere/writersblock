import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './generic/icon';

const StoryBoardBar = ({
  computedMatch, mobile,
}) => {
  const { storyId } = computedMatch.params;

  const renderNavItem = (iconName, route) => {
    const link = (
      <Link
        className={mobile ? 'navbar-brand' : 'nav-link'}
        to={`/stories/${storyId}${route || ''}`}
        style={mobile
          ? {
            marginTop: '5px',
            marginBottom: '5px',
            marginLeft: '10px',
            marginRight: '10px',
            padding: '0px',
          }
          : undefined
        }
      >
        <Icon
          name={iconName}
          size={mobile ? 'lg' : '2x'}
          color="white"

        />
      </Link>
    );
    if (mobile) {
      return link;
    }
    return (
      <li className="nav-item">
        {link}
      </li>
    );
  };

  const renderItems = () => (
    <Fragment>
      {renderNavItem('book')}
      {renderNavItem('book-open', '/chapters')}
      {renderNavItem('user', '/characters')}
      {renderNavItem('shield-alt', '/items')}
      {renderNavItem('globe', '/places')}
      {renderNavItem('bolt', '/powers')}
      {renderNavItem('cogs', '/storySettings')}
    </Fragment>
  );

  return (
    <nav className={mobile ? 'fixed-bottom navbar-dark bg-dark' : 'sidebar'}>
      {mobile
        ? renderItems()
        : (
          <ul className="navbar-nav">
            {renderItems()}
          </ul>
        )
      }
    </nav>
  );
};

StoryBoardBar.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  mobile: PropTypes.object.isRequired,
};

export default StoryBoardBar;
