import React from 'react';
import { enrichStateFieldUpdates, getFieldStateFunctionName } from '../../helpers';

import LabelAndField from '../generic/labelAndField';
import Form from '../generic/form';
import Button from '../generic/button';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: '',
        password: '',
      },
    };
    enrichStateFieldUpdates(this);
  }

  updateField = (field, value) => {
    const updateFunction = getFieldStateFunctionName(this, field);
    updateFunction(value);
  }

  render() {
    const { fields: { username, password } } = this.state;
    return (
      <div>
        <h5>Enter credentials</h5>
        <Form button={{ color: 'green', text: 'Login' }}>
          <LabelAndField type="text" label="Username" onChange={e => this.updateField('username', e)} value={username} />
          <LabelAndField type="password" label="Password" onBlur={e => this.updateField('password', e)} value={password} />
        </Form>
        <h5>OR</h5>
        <Button color="blue" linkTo="/register">Register</Button>
      </div>
    );
  }
}

export default LoginForm;
