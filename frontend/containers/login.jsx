import React from 'react';

import LoginForm from '../components/forms/login';
import WithNavBar from '../components/hoc/withNavBar';

const messageOne = `
Writersblock stores your data in your browsers database. This means that the data will NEVER be synced to a database.
`;
const messageTwo = `
However, we will place a small security measure around your data so that evil lookers cannot immediately view your stories.
`;

const Login = props => (
  <div className="container">
    <h4>Login</h4>
    <p>{messageOne}</p>
    <p>{messageTwo}</p>
    <LoginForm {...props} />
  </div>
);

export default WithNavBar(Login);
