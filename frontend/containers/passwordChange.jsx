import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateUser } from '../actions/user';

import WithNavBar from '../components/hoc/withNavBar';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';

const message = `
Please provide all the necessary fields to update your password.
`;

const PasswordChange = ({
  dispatch, userStore,
}) => {
  const user = userStore.loggedInUser;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [completed, setCompleted] = useState(false);

  const checkPassword = () => oldPassword === user.password;

  const save = async () => {
    if (checkPassword(oldPassword)) {
      const updatedUser = {
        ...user,
        password: newPassword,
      };
      await updateUser(updatedUser, dispatch);
      setCompleted(true);
    }
  };

  if (completed) {
    return <Redirect to="/user" />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={save} onClose={() => setCompleted(true)} />

      <div className="container">
        <h4>{`Hello ${userStore.loggedInUser.userName}`}</h4>
        <p>{message}</p>
        <form className="form-horizontal">
          <LabelAndField required type="password" label="Old password" onChange={setOldPassword} value={oldPassword} />
          <LabelAndField required type="password" label="New password" onChange={setNewPassword} value={newPassword} />
        </form>

      </div>

    </Fragment>
  );
};

PasswordChange.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
};

export default WithNavBar(PasswordChange);
