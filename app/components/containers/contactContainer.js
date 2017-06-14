import React from 'react';
import PropTypes from 'prop-types';
import Button from '../standardComponents/button';

class ContactContainer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>{"A team of Bro's!"}</h1>
            <div className="error-details">
              <h4>From Antwerp, we are.</h4>
              <p>Like programming is actually writing out an analysis, writing a story feels the same. But we missed one thing. How do we build our characters.</p>
              <p>After some time, the question rose to build a platform were it was possible to create a character data sheet so we have an option to create in-depth personalities.</p>
              <h4>Robin And Cedric</h4>
              <p>Robin is a programmer who works fulltime as a consultant for the government.</p>
              <p>Cedric is a student for Civil Engineer.</p>
              <p>Together we build Writersblock.</p>
              <h4>Contribute</h4>
              <p>Get in touch if you have ideas or if you simply wish to constribute.</p>
              <a href="http://github.com/robinschuere">Github</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContactContainer;