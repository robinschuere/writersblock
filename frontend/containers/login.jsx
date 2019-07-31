import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginUser } from '../actions/user';

import WithNavBar from '../components/hoc/withNavBar';
import LabelAndField from '../components/generic/labelAndField';
import Form from '../components/generic/form';
import Button from '../components/generic/button';
import Alert from '../components/generic/alert';

const Login = ({
  dispatch, i18n, changeLanguage, userStore,
}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (userStore.loggedInUser) {
    return <Redirect to="/" />;
  }

  const validate = () => {
    if ([userName, password].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const handleOnClick = async () => {
    if (validate()) {
      const login = await loginUser(userName, password, dispatch, changeLanguage);

      if (login) {
        setCompleted(true);
      }

      setUserName('');
      setPassword('');
      return;
    }
    setUserName('');
    setPassword('');
    setAlert(true);
  };

  if (completed) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h4>{i18n.t('credentials.login')}</h4>
      <p>{i18n.t('credentials.messages.one')}</p>
      <p>{i18n.t('credentials.messages.two')}</p>
      <h5>{i18n.t('credentials.header')}</h5>
      {showAlert && <Alert message={i18n.t('credentials.error')} level="error" onClose={setAlert(false)} />}
      <Form button={{ color: 'green', text: i18n.t('credentials.login') }} secondaryButton={<Button color="blue" linkTo="/register">{i18n.t('credentials.register')}</Button>} onClick={handleOnClick}>
        <LabelAndField type="text" label={i18n.t('credentials.username')} placeholder={i18n.t('credentials.placeholders.username')} onChange={setUserName} value={userName} />
        <LabelAndField type="password" label={i18n.t('credentials.password')} placeholder={i18n.t('credentials.placeholders.password')} onChange={setPassword} value={password} onEnter={handleOnClick} />
      </Form>
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
};

export default WithNavBar(Login);
