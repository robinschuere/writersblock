import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';

const NotFound = ({ i18n }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="error-template">
          <h1>{i18n.t('notfound.header')}</h1>
          <h2>{i18n.t('notfound.notfound')}</h2>
          <div className="error-details">
            <p>{i18n.t('notfound.message')}</p>
          </div>
          <div className="error-actions">
            <Button isLink linkTo="/" isSave icon="home">{i18n.t('notfound.return')}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

NotFound.propTypes = {
  i18n: PropTypes.object.isRequired,
};


export default WithNavBar(NotFound);
