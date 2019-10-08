import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { isMobile } from '../../helpers';
import { constants } from '../../constants';

import NavBar from '../navbar';
import Footer from '../footer';
import { hasAuthorDescription } from '../../reducers/story';

import StoryBoardBar from '../storyBoardBar';

const WithNavBar = (WrappedComponent) => {
  const HOCWithNavBar = (props) => {
    const {
      computedMatch, i18n,
    } = props;
    const { storyId } = computedMatch.params;
    const { stores, ...rest } = props;
    const withAuthorDescription = storyId
      ? hasAuthorDescription(stores.storyStore, storyId)
      : false;
    const [mobile, setMobile] = useState(isMobile());

    const updateDimensions = () => setMobile(isMobile());

    useEffect(() => {
      window.addEventListener('resize', updateDimensions);

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    });

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const showNavBar = !constants.routesWithoutNavBarOrFooter.includes(computedMatch.path);

    const showStoryBoard = constants.routesWithStoryBoard.includes(computedMatch.path);

    const component = (
      <Fragment>

        {showNavBar && <div style={{ marginBottom: 25 }} />}

        <WrappedComponent
          {...rest}
          {...stores}
          withAuthorDescription={withAuthorDescription}
          mobile={mobile}
          key={computedMatch.path}
        />
        {showNavBar && <div style={{ marginBottom: 150 }} />}

      </Fragment>
    );

    return (
      <Fragment>
        {showNavBar && (
          <NavBar
            {...rest}
            mobile={mobile}
            userStore={stores ? stores.userStore : {}}
            storyStore={stores ? stores.storyStore : {}}
          />
        )}

        {(showStoryBoard && !mobile) && (
          <Fragment>
            <div className="row" style={{ margin: 0 }}>
              <div className="col-md-1 bg-dark text-center" style={{ position: 'fixed', top: 56, bottom: 0 }}>
                <StoryBoardBar
                  computedMatch={computedMatch}
                />
              </div>
              <div className="col-md-11 offset-md-1">
                {component}
              </div>
            </div>
          </Fragment>
        )}

        {(showStoryBoard && mobile) && (
          <Fragment>
            {component}
            <StoryBoardBar
              mobile
              computedMatch={computedMatch}
            />
          </Fragment>
        )}

        {!showStoryBoard && component}

        {showNavBar && !mobile && <Footer i18n={i18n} />}

      </Fragment>
    );
  };

  HOCWithNavBar.propTypes = {
    stores: PropTypes.object.isRequired,
    computedMatch: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
  };

  return HOCWithNavBar;
};

export default WithNavBar;
