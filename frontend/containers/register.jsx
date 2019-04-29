import React from 'react';
import RegisterForm from '../components/forms/register';

const message = `
Writersblock stores your data in your browsers database. This means that the data will NEVER be synced to a database.
However, Writersblock will place a small security measure around your data so that evil lookers cannot immediately view your stories.
`;

const Register = props => (
  <div className="container">
    <h4>Register</h4>
    <p>{message}</p>
    <RegisterForm {...props} />
  </div>
);

export default Register;
