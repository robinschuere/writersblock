import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { isMobile } from '../../helpers';
import constants from '../../constants';

import NavBar from '../navbar';
import Footer from '../footer';

const WithNavBar = (WrappedComponent) => {
  const HOCWithNavBar = (props) => {
    const {
      stores, dispatch, computedMatch, i18n, changeLanguage, language,
    } = props;
    const [mobile, setMobile] = useState(isMobile());

    const updateDimensions = () => setMobile(isMobile());

    useEffect(() => {
      window.scrollTo(0, 0);
      window.addEventListener('resize', updateDimensions);

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    });

    const showNavBar = !constants.routesWithoutNavBarOrFooter.includes(computedMatch.path);

    return (
      <Fragment>
        {showNavBar && (
          <NavBar
            mobile={mobile}
            userStore={stores ? stores.userStore : {}}
            dispatch={dispatch}
            i18n={i18n}
            language={language}
            changeLanguage={changeLanguage}
            computedMatch={computedMatch}
            storyStore={stores ? stores.storyStore : {}}
          />
        )}

        {showNavBar && <div style={{ marginBottom: 25 }} />}
        <WrappedComponent
          key={computedMatch.path}
          {...stores}
          computedMatch={computedMatch}
          dispatch={dispatch}
          mobile={mobile}
          i18n={i18n}
          changeLanguage={changeLanguage}
          language={language}
        />

        {showNavBar && <div style={{ marginBottom: 150 }} />}

        {showNavBar && <Footer i18n={i18n} />}

      </Fragment>
    );
  };

  HOCWithNavBar.propTypes = {
    stores: PropTypes.object.isRequired,
    computedMatch: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
  };

  return HOCWithNavBar;
};

export default WithNavBar;
