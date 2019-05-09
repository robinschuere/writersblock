import React from 'react';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';

const NotFound = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="error-template">
          <h1>Oops</h1>
          <h2>404 Not Found</h2>
          <div className="error-details">
            <p>Sorry, an error has occured, Requested page not found!</p>
          </div>
          <div className="error-actions">
            <Button isLink linkTo="/" isSave icon="home"> Home </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WithNavBar(NotFound);
