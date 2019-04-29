import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelAndField from '../generic/labelAndField';
import Form from '../generic/form';
import Alert from '../generic/alert';

const RegisterForm = ({ userStore, dispatch }) => {
  const [showAlert, setAlert] = useState(false);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postbox, setPostBox] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const validateNewUser = () => {
    if ([userName, password, email].filter(x => x).length !== 3) {
      return false;
    }
    return true;
  };

  const register = () => {
    setValidatedOnce(true);
    if (validateNewUser()) {
      const user = {
        userName,
        password: window.btoa(password),
        email,
        firstName,
        lastName,
        dateOfBirth,
        country,
        city,
        postal,
        street,
        houseNumber,
        postbox,
      };
      console.log('user to be created', user);
      dispatch({ type: 'add_user', value: user });
    } else {
      setAlert(true);
    }
  };

  return (
    <div>
      {showAlert && <Alert message="You still need to enter some information" level="error" onClose={setAlert(false)} />}
      <h4>{`THERE ARE ${userStore.length} amount of users available`}</h4>
      <Form button={{ color: 'green', text: 'Register' }} onClick={register}>
        <h5>Registration information</h5>
        <LabelAndField validatedOnce={validatedOnce} required type="text" label="Username" onChange={setUserName} value={userName} />
        <LabelAndField validatedOnce={validatedOnce} required type="password" label="Password" onChange={setPassword} value={password} />
        <h5>Personal information</h5>
        <LabelAndField validatedOnce={validatedOnce} required type="mail" label="Email" onChange={setEmail} value={email} />
        <LabelAndField type="text" label="Firstname" onChange={setFirstName} value={firstName} />
        <LabelAndField type="text" label="Lastname" onChange={setLastName} value={lastName} />
        <LabelAndField type="date" label="Date of birth" onBlur={setDateOfBirth} value={dateOfBirth} />
        <h5>Address</h5>
        <LabelAndField type="text" label="Country" onChange={setCountry} value={country} />
        <LabelAndField type="text" label="City" onChange={setCity} value={city} />
        <LabelAndField type="text" label="Postalcode" onChange={setPostal} value={postal} />
        <LabelAndField type="text" label="Street" onChange={setStreet} value={street} />
        <LabelAndField type="text" label="Number" onChange={setHouseNumber} value={houseNumber} />
        <LabelAndField type="text" label="Box" onChange={setPostBox} value={postbox} />
        <h5>Personal description</h5>
        <LabelAndField type="textarea" label="Synopsis" onChange={setSynopsis} value={synopsis} />
      </Form>

    </div>
  );
};

RegisterForm.propTypes = {
  userStore: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default RegisterForm;
