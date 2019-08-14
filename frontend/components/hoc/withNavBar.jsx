import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { isMobile } from '../../helpers';
import constants from '../../constants';

import NavBar from '../navbar';
import Footer from '../footer';

const WithNavBar = (WrappedComponent) => {
  const HOCWithNavBar = (props) => {
    const {
      computedMatch, i18n,
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
    const { stores, ...rest } = props;
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

        {showNavBar && <div style={{ marginBottom: 25 }} />}
        <WrappedComponent
          {...rest}
          {...stores}
          mobile={mobile}
          key={computedMatch.path}
        />

        {showNavBar && <div style={{ marginBottom: 150 }} />}

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
