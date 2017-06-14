import React from 'react';
import { connect } from 'react-redux';
import Register from '../userComponents/register';
import { newUser } from '../../constants';

class RegisterContainer extends React.Component {
  constructor() {
    super();
    this.state = { user: newUser() };
  }
  render() {
    return (
      <Register
        user={this.state.user}
        onFirstNameChange={(e) => { this.handlePropChange('firstName', e);}}
        onLastNameChange={(e) => { this.handlePropChange('lastName', e);}}
        onEmailChange={(e) => { this.handlePropChange('email', e);}}
        onPasswordChange={(e) => { this.handlePropChange('password', e);}}
        onSave={() => {}}/>
    );
  }
  handlePropChange = (field, value) => {
    let user = this.state.user;
    user[field] = value;
    this.setState({ user: user });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer)
