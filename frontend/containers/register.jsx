import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser } from '../actions/user';
import { getLanguages } from '../helpers';

import WithNavBar from '../components/hoc/withNavBar';
import LabelAndField from '../components/generic/labelAndField';
import Alert from '../components/generic/alert';
import Button from '../components/generic/button';

const Register = ({
  dispatch, i18n, history,
}) => {
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postbox, setPostBox] = useState('');
  const [language, setLanguage] = useState(i18n.language);
  const [synopsis, setSynopsis] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [showUserNameAlert, setUserNameAlert] = useState(false);

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
        firstName,
        lastName,
        dateOfBirth,
        country,
        city,
        postal,
        street,
        houseNumber,
        postbox,
        synopsis,
      };
      const succes = await registerUser(user, dispatch);
      if (succes) {
        history.push('/stories/');
        return;
      }
      setUserNameAlert(true);
      return;
    }
    setAlert(true);
  };

  return (
    <div className="container">
      <h4>{i18n.t('credentials.register')}</h4>
      <p>{i18n.t('credentials.messages.one')}</p>
      <p>{i18n.t('credentials.messages.two')}</p>
      {showAlert && <Alert message={i18n.t('credentials.passwordEdit.alert')} level="error" onClose={() => setAlert(false)} />}
      {showUserNameAlert && <Alert message={i18n.t('credentials.passwordEdit.alertUserName')} level="error" onClose={() => setUserNameAlert(false)} />}
      <Button color="green" toRight onClick={register}>{i18n.t('credentials.register')}</Button>
      <form className="form-horizontal">
        <h5>{i18n.t('credentials.header')}</h5>
        <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('credentials.username')} placeholder={i18n.t('credentials.placeholders.username')} onChange={setUserName} value={userName} />
        <LabelAndField validatedOnce={validatedOnce} required type="password" label={i18n.t('credentials.password')} placeholder={i18n.t('credentials.placeholders.password')} onChange={setPassword} value={password} />
        <h5>{i18n.t('user.edit.informationSubHeader')}</h5>
        <LabelAndField validatedOnce={validatedOnce} required type="mail" label={i18n.t('user.email')} placeholder={i18n.t('user.email')} value={email} onChange={setEmail} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.firstname')} placeholder={i18n.t('user.placeholders.firstname')} onChange={setFirstName} value={firstName} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.lastname')} placeholder={i18n.t('user.placeholders.lastname')} onChange={setLastName} value={lastName} />
        <LabelAndField validatedOnce={validatedOnce} type="date" label={i18n.t('user.dateOfBirth')} onBlur={setDateOfBirth} value={dateOfBirth} />
        <h5>{i18n.t('user.edit.addressSubHeader')}</h5>
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.country')} placeholder={i18n.t('user.placeholders.country')} onChange={setCountry} value={country} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.city')} placeholder={i18n.t('user.placeholders.city')} onChange={setCity} value={city} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.postal')} placeholder={i18n.t('user.placeholders.postal')} onChange={setPostal} value={postal} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.street')} placeholder={i18n.t('user.placeholders.street')} onChange={setStreet} value={street} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.number')} placeholder={i18n.t('user.placeholders.number')} onChange={setHouseNumber} value={houseNumber} />
        <LabelAndField validatedOnce={validatedOnce} type="text" label={i18n.t('user.box')} placeholder={i18n.t('user.placeholders.box')} onChange={setPostBox} value={postbox} />
        <LabelAndField validatedOnce={validatedOnce} type="select" options={getLanguages()} label={i18n.t('user.language')} onChange={setLanguage} value={language} />
        <h5>{i18n.t('user.edit.descriptionSubHeader')}</h5>
        <LabelAndField type="textarea" label={i18n.t('user.synopsis')} placeholder={i18n.t('user.placeholders.synopsis')} onChange={setSynopsis} value={synopsis} />
        <Button color="green" toRight onClick={register}>{i18n.t('credentials.register')}</Button>
      </form>

    </div>
  );
};

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default WithNavBar(withRouter(Register));
