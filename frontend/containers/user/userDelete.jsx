import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeUser } from '../../actions/user';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const UserDelete = ({
  userStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const user = userStore.loggedInUser;

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeUser(user, dispatch);
    setRemoved(true);
  };

  if (completed) {
    return <Redirect to="/user" />;
  }

  if (removed) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar mobile={mobile} onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container-fluid">
        <h4>{i18n.t('user.delete.header')}</h4>
        <p>{i18n.t('user.delete.message')}</p>
      </div>
    </Fragment>
  );
};

UserDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(UserDelete);
