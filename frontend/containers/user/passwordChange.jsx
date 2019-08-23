import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateUser } from '../../actions/user';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';

const PasswordChange = ({
  dispatch, userStore, i18n, mobile,
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
      <BackAndSaveBar
        mobile={mobile}
        onAccept={save}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />

      <div className="container">
        <h4>{i18n.t('credentials.passwordEdit.header', { title: userStore.loggedInUser.userName })}</h4>
        <p>{i18n.t('credentials.passwordEdit.message')}</p>
        <form className="form-horizontal">
          <LabelAndField required type="password" label={i18n.t('credentials.passwordEdit.oldPassword')} placeholder={i18n.t('credentials.passwordEdit.placeholders.oldPassword')} onChange={setOldPassword} value={oldPassword} />
          <LabelAndField required type="password" label={i18n.t('credentials.passwordEdit.newPassword')} placeholder={i18n.t('credentials.passwordEdit.placeholders.newPassword')} onChange={setNewPassword} value={newPassword} />
        </form>
      </div>

    </Fragment>
  );
};

PasswordChange.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(PasswordChange);
