import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/user';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndField from '../../components/generic/labelAndField';
import Form from '../../components/generic/form';
import Button from '../../components/generic/button';
import Alert from '../../components/generic/alert';

const Login = ({
  dispatch, i18n, changeLanguage, userStore,
}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [enter, setEnter] = useState(false);

  if (userStore.loggedInUser) {
    return <Redirect to="/stories" />;
  }

  const validate = () => {
    if ([userName, password].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const setLogin = (login) => {
    setEnter(false);
    if (login) {
      setCompleted(true);
    } else {
      setUserName('');
      setPassword('');
      setAlert(true);
    }
  };

  const handleOnClick = async () => {
    if (!completed && validate()) {
      const login = await loginUser(userName, password, dispatch, changeLanguage);
      setLogin(login);
    }
    setLogin();
  };

  if (completed) {
    return <Redirect to="/" />;
  }

  if (enter) {
    handleOnClick();
  }

  return (
    <div className="container-fluid">
      <h4>{i18n.t('credentials.login')}</h4>
      {showAlert && <Alert message={i18n.t('credentials.error')} level="error" onClose={() => setAlert(false)} />}
      <Form button={{ color: 'green', text: i18n.t('credentials.login') }} secondaryButton={<Button color="blue" linkTo="/register">{i18n.t('credentials.register')}</Button>} onClick={handleOnClick}>
        <LabelAndField validatedOnce type="text" label={i18n.t('credentials.username')} placeholder={i18n.t('credentials.placeholders.username')} onChange={setUserName} value={userName} />
        <LabelAndField validatedOnce type="password" label={i18n.t('credentials.password')} placeholder={i18n.t('credentials.placeholders.password')} onChange={setPassword} value={password} onEnter={setEnter} />
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
