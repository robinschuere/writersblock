import React, { useState } from 'react';

import LabelAndField from '../generic/labelAndField';
import Form from '../generic/form';
import Button from '../generic/button';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h5>Enter credentials</h5>
      <Form button={{ color: 'green', text: 'Login' }} secondaryButton={<Button color="blue" linkTo="/register">Register</Button>}>
        <LabelAndField type="text" label="Username" onChange={setUserName} value={userName} />
        <LabelAndField type="password" label="Password" onBlur={setPassword} value={password} />
      </Form>
    </div>
  );
};

export default LoginForm;
