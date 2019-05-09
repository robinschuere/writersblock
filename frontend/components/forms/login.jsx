import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/user';

import LabelAndField from '../generic/labelAndField';
import Form from '../generic/form';
import Button from '../generic/button';
import Alert from '../generic/alert';

const LoginForm = ({ dispatch }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validate = () => {
    if ([userName, password].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const handleOnClick = async () => {
    if (validate()) {
      const login = await loginUser(userName, password, dispatch);

      if (login) {
        setCompleted(true);
      }

      setUserName('');
      setPassword('');
      return;
    }
    setUserName('');
    setPassword('');
    setAlert(true);
  };

  if (completed) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h5>Enter credentials</h5>
      {showAlert && <Alert message="Wrong credentials" level="error" onClose={setAlert(false)} />}
      <Form button={{ color: 'green', text: 'Login' }} secondaryButton={<Button color="blue" linkTo="/register">Register</Button>} onClick={handleOnClick}>
        <LabelAndField type="text" label="Username" onChange={setUserName} value={userName} />
        <LabelAndField type="password" label="Password" onChange={setPassword} value={password} />
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default LoginForm;
