import React from 'react';
import PropTypes from 'prop-types';
import Button from '../standardComponents/button';

class ContactContainer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>{"Contact!"}</h1>
            <h2>{"Who are we"}</h2>
            <div className="error-details">
              {"This app is created and being maintained by Robin Schuerewegen."}
            </div>
            <div className="error-actions">
              <Button isLink linkTo={"/"} isSave icon="home">{" Home"}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContactContainer;