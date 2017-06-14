import React from 'react';
import PropTypes from 'prop-types';
import Form from '../standardComponents/form';
import LabelAndField from '../standardComponents/labelAndField';

class Register extends React.Component{
  render(){
    return (
      <Form isSave
        title="Register"
        onSave={() => { this.props.onSave(this.props.user); }}>
        <LabelAndField
          label="Firstname"
          value={this.props.user.firstName}
          placeholder="Give your firstname"
          onChange={this.props.onFirstNameChange} />
        <LabelAndField
          label="Lastname"
          value={this.props.user.lastName}
          placeholder="Give your lastname"
          onChange={this.props.onLastNameChange} />
        <LabelAndField
          label="email"
          type="email"
          value={this.props.user.email}
          placeholder="Give a valid email"
          onChange={this.props.onEmailChange} />
        <LabelAndField
          label="Password"
          type="password"
          value={this.props.user.password}
          placeholder="Enter a password"
          onChange={this.props.onPasswordChange} />
      </Form>
    );
  }
};

Register.propTypes = {
  user: PropTypes.object,
  onFirstNameChange: PropTypes.func,
  onLastNameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onSave: PropTypes.func,
}

export default Register;