import React from 'react';
import PropTypes from 'prop-types';
import Button from '../standardComponents/button';

class NotFoundContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>{"Oops!"}</h1>
              <h2>{"404 Not Found"}</h2>
              <div className="error-details">
                {"Sorry, an error has occured, Requested page not found!"}
              </div>
              <div className="error-actions">
                <Button isLink linkTo={"/"} isSave icon="home">{"Home"}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NotFoundContainer;