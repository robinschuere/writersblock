import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { updateUser } from '../actions/user';
import { getLanguages } from '../helpers';

import LabelAndField from '../components/generic/labelAndField';
import LabelAndText from '../components/generic/labelAndText';
import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const UserEdit = ({
  dispatch, userStore, i18n,
}) => {
  const user = userStore.loggedInUser;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [postal, setPostal] = useState(user.postal);
  const [street, setStreet] = useState(user.street);
  const [houseNumber, setHouseNumber] = useState(user.houseNumber);
  const [postbox, setPostBox] = useState(user.postbox);
  const [synopsis, setSynopsis] = useState(user.synopsis);
  const [language, setLanguage] = useState(user.language);
  const [completed, setCompleted] = useState(false);

  const save = async () => {
    const updatedUser = {
      ...user,
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
      language,
    };
    await updateUser(updatedUser, dispatch);
    setCompleted(true);
  };

  if (completed) {
    return <Redirect to="/user" />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={save} onClose={() => setCompleted(true)} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('user.edit.header', { username: userStore.loggedInUser.userName })}</h4>
        <p>{i18n.t('user.edit.message')}</p>
        <form className="form-horizontal">
          <h5>{i18n.t('user.edit.informationSubHeader')}</h5>
          <LabelAndText type="text" label={i18n.t('user.email')} placeholder={i18n.t('user.email')} value={user.email} />
          <LabelAndField type="text" label={i18n.t('user.firstname')} placeholder={i18n.t('generic.placeholders.firstname')} onChange={setFirstName} value={firstName} />
          <LabelAndField type="text" label={i18n.t('user.lastname')} placeholder={i18n.t('generic.placeholders.lastname')} onChange={setLastName} value={lastName} />
          <LabelAndField type="date" label={i18n.t('user.dateOfBirth')} onBlur={setDateOfBirth} value={dateOfBirth} />
          <h5>{i18n.t('user.edit.addressSubHeader')}</h5>
          <LabelAndField type="text" label={i18n.t('user.country')} placeholder={i18n.t('user.placeholders.country')} onChange={setCountry} value={country} />
          <LabelAndField type="text" label={i18n.t('user.city')} placeholder={i18n.t('user.placeholders.city')} onChange={setCity} value={city} />
          <LabelAndField type="text" label={i18n.t('user.postal')} placeholder={i18n.t('user.placeholders.postal')} onChange={setPostal} value={postal} />
          <LabelAndField type="text" label={i18n.t('user.street')} placeholder={i18n.t('user.placeholders.street')} onChange={setStreet} value={street} />
          <LabelAndField type="text" label={i18n.t('user.number')} placeholder={i18n.t('user.placeholders.number')} onChange={setHouseNumber} value={houseNumber} />
          <LabelAndField type="text" label={i18n.t('user.box')} placeholder={i18n.t('user.placeholders.box')} onChange={setPostBox} value={postbox} />
          <LabelAndField type="select" options={getLanguages()} label={i18n.t('user.language')} onChange={setLanguage} value={language} />
          <h5>{i18n.t('user.edit.descriptionSubHeader')}</h5>
          <LabelAndField type="textarea" label={i18n.t('user.synopsis')} placeholder={i18n.t('user.placeholders.synopsis')} onChange={setSynopsis} value={synopsis} />
        </form>
      </div>
    </Fragment>
  );
};

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(UserEdit);
