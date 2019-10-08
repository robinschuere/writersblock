import React, { useState, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/user';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndField from '../../components/generic/labelAndField';
import Alert from '../../components/generic/alert';
import BackAndRegisterBar from '../../components/backAndRegisterBar';

const Register = ({
  dispatch, i18n, mobile,
}) => {
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [showUserNameAlert, setUserNameAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateNewUser = () => {
    if ([userName, password, email].filter(x => x).length !== 3) {
      return false;
    }
    return true;
  };

  const register = async () => {
    setValidatedOnce(true);
    if (validateNewUser()) {
      const user = {
        userName,
        password,
        email,
        language: i18n.language,
      };
      const succes = await registerUser(user, dispatch);

      if (succes) {
        setCompleted(true);
        return;
      }
      setUserNameAlert(true);
      return;
    }
    setAlert(true);
  };

  if (completed) {
    return <Redirect to="/stories" />;
  }

  return (
    <Fragment>
      <BackAndRegisterBar
        mobile={mobile}
        onAccept={register}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        <h4>{i18n.t('credentials.register')}</h4>
        {showAlert && <Alert message={i18n.t('credentials.passwordEdit.alert')} level="error" onClose={() => setAlert(false)} />}
        {showUserNameAlert && <Alert message={i18n.t('credentials.passwordEdit.alertUserName')} level="error" onClose={() => setUserNameAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('credentials.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('credentials.username')} placeholder={i18n.t('credentials.placeholders.username')} onChange={setUserName} value={userName} />
          <LabelAndField validatedOnce={validatedOnce} required type="password" label={i18n.t('credentials.password')} placeholder={i18n.t('credentials.placeholders.password')} onChange={setPassword} value={password} />
          <LabelAndField validatedOnce={validatedOnce} required type="mail" label={i18n.t('user.email')} placeholder={i18n.t('user.email')} value={email} onChange={setEmail} />
        </form>

      </div>
    </Fragment>
  );
};

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Register));
