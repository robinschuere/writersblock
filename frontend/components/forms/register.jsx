import React from 'react';
import { enrichStateFieldUpdates, getFieldStateFunctionName } from '../../helpers';

import LabelAndField from '../generic/labelAndField';
import Form from '../generic/form';
import Alert from '../generic/alert';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        dateOfBirth: undefined,
        country: '',
        city: '',
        postalCode: '',
        street: '',
        houseNumber: '',
        postalBox: '',
      },
      showAlert: false,
      validatedOnce: false,
    };
    enrichStateFieldUpdates(this);
  }

  updateField = (field, value) => {
    const updateFunction = getFieldStateFunctionName(this, field);
    updateFunction(value);
  }

  validateNewUser = () => {
    const { fields: { username, password, email } } = this.state;
    if ([username, password, email].filter(x => x).length !== 3) {
      return false;
    }
    return true;
  }

  toggleInvalidUserAlert = () => {
    const { showAlert } = this.state;
    this.setState({ showAlert: !showAlert, validatedOnce: true });
  }

  register = () => {
    if (this.validateNewUser()) {
      console.log('saving');
    } else {
      this.toggleInvalidUserAlert();
    }
  }

  render() {
    const {
      fields: {
        username, password, email, firstname, lastname, dateOfBirth,
        country, street, postalCode, city, houseNumber, postalBox,
      },
      showAlert,
      validatedOnce,
    } = this.state;
    return (
      <div>
        {showAlert && <Alert message="You still need to enter some information" level="error" onClose={this.toggleInvalidUserAlert} />}

        <Form button={{ color: 'green', text: 'Register' }} onClick={this.register}>
          <h5>Registration information</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label="Username" onChange={e => this.updateField('username', e)} value={username} />
          <LabelAndField validatedOnce={validatedOnce} required type="password" label="Password" onBlur={e => this.updateField('password', e)} value={password} />
          <h5>Personal information</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="mail" label="Email" onChange={e => this.updateField('email', e)} value={email} />
          <LabelAndField type="text" label="Firstname" onChange={e => this.updateField('firstname', e)} value={firstname} />
          <LabelAndField type="text" label="Lastname" onChange={e => this.updateField('lastname', e)} value={lastname} />
          <LabelAndField type="date" label="Date of birth" onBlur={e => this.updateField('dateOfBirth', e)} value={dateOfBirth} />
          <h5>Address</h5>
          <LabelAndField type="text" label="Country" onChange={e => this.updateField('country', e)} value={country} />
          <LabelAndField type="text" label="City" onChange={e => this.updateField('city', e)} value={city} />
          <LabelAndField type="text" label="Postalcode" onChange={e => this.updateField('postalCode', e)} value={postalCode} />
          <LabelAndField type="text" label="Street" onChange={e => this.updateField('street', e)} value={street} />
          <LabelAndField type="text" label="Number" onChange={e => this.updateField('houseNumber', e)} value={houseNumber} />
          <LabelAndField type="text" label="Box" onChange={e => this.updateField('postalBox', e)} value={postalBox} />
        </Form>

      </div>
    );
  }
}

export default LoginForm;
