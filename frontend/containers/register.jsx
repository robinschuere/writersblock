import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser } from '../actions/user';

import WithNavBar from '../components/hoc/withNavBar';
import LabelAndField from '../components/generic/labelAndField';
import Form from '../components/generic/form';
import Alert from '../components/generic/alert';

const message = `
Writersblock stores your data in your browsers database. This means that the data will NEVER be synced to a database.
However, Writersblock will place a small security measure around your data so that evil lookers cannot immediately view your stories.
`;

const Register = ({ dispatch }) => {
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
  const [completed, setCompleted] = useState(false);

  const validateNewUser = () => {
    if ([userName, password, email].filter(x => x).length !== 3) {
      return false;
    }
    return true;
  };

  const register = async () => {
    setValidatedOnce(true);
    if (validateNewUser()) {
      const user = {
        userName,
        password,
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
        synopsis,
      };
      await registerUser(user, dispatch);
      setCompleted(true);
      return;
    }
    setAlert(true);
  };

  if (completed) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h4>Register</h4>
      <p>{message}</p>
      {showAlert && <Alert message="You still need to enter some information" level="error" onClose={setAlert(false)} />}
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

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default WithNavBar(Register);
