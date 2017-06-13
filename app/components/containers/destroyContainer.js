import React from 'react';
import PropTypes from 'prop-types';
import Button from '../standardComponents/button';
import { destroyDb } from '../../pouch/character';

class DestroyContainer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>{"Drop Thy Data?"}</h1>
            <h2>{"Are you sure?"}</h2>
            <div className="error-details">
              <p>Writersblock is meant to keep the data you have stored in the database on your device. There is no way we can garantee to restore your database.</p>
              <p>Are you sure that this data can be deleted? If yes then proceed.</p>
              <p>After deleting the database you will be routed to the home page. You only need to refresh...</p>
            </div>
            <div className="error-actions">
              <p>
                <Button isLink linkTo={"/"} isSave onClick={() => { destroyDb() }} icon="erase">{" Continue"}</Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DestroyContainer;