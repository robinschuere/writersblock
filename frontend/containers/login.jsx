import React from 'react';
import LoginForm from '../components/forms/login';

const message = `
Writersblock stores your data in your browsers database. This means that the data will NEVER be synced to a database. </br>
However, Writersblock will place a small security measure around your data so that evil lookers cannot immediately view your stories.
`;

const Login = () => (
  <div className="container">
    <h4>Login</h4>
    <p>{message}</p>
    <LoginForm />
  </div>
);

export default Login;
