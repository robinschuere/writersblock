import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { isMobile } from '../../helpers';

import NavBar from '../navbar';
import StoryBoardBar from '../storyBoardBar';
import Footer from '../footer';

const WithNavBar = (WrappedComponent) => {
  const HOC = (props) => {
    const { stores, dispatch, computedMatch } = props;
    const [mobile, setMobile] = useState(isMobile());

    const updateDimensions = () => setMobile(isMobile());

    useEffect(() => {
      window.addEventListener('resize', updateDimensions);
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    });

    const routesWithoutNavBarOrFooter = [
      '/user',
      '/user/changepassword',
      '/stories/new',
    ];

    const routesWithStoryBoard = [
      '/stories/:storyId',
    ];

    const showNavBar = !routesWithoutNavBarOrFooter.includes(computedMatch.path);
    const showStoryBoard = routesWithStoryBoard.includes(computedMatch.path);

    const component = (
      <WrappedComponent
        {...stores}
        computedMatch={computedMatch}
        dispatch={dispatch}
        mobile={mobile}
      />
    );

    return (
      <Fragment>
        {showNavBar && <NavBar mobile={mobile} userStore={stores ? stores.userStore : {}} />}

        {showStoryBoard && (
          <StoryBoardBar mobile={mobile} computedMatch={computedMatch} component={component} />
        )}
        {!showStoryBoard && component}

        {showNavBar && <div style={{ marginBottom: 150 }} />}
        {showNavBar && <Footer />}
      </Fragment>
    );
  };

  HOC.propTypes = {
    stores: PropTypes.object.isRequired,
    computedMatch: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  return HOC;
};

export default WithNavBar;
