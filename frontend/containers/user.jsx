import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';
import { getLanguages } from '../helpers';

const User = ({
  userStore, history, i18n,
}) => {
  const user = userStore.loggedInUser;

  const handleChangeUser = () => {
    history.push('/user/edit');
  };

  const handleChangePassword = () => {
    history.push('/user/changepassword');
  };

  return (
    <div>
      <div className="container">
        <h4>{i18n.t('credentials.view.header')}</h4>
        <p>{i18n.t('credentials.view.message')}</p>
        <Button color="green" toRight onClick={handleChangePassword}>{i18n.t('generic.edit')}</Button>
        <form className="form-horizontal">
          <h5>{i18n.t('credentials.header')}</h5>
          <LabelAndText type="text" label={i18n.t('credentials.username')} value={user.userName} />
          <LabelAndText type="password" label={i18n.t('credentials.password')} value="*****************" />
          <Button color="green" toRight onClick={handleChangeUser}>{i18n.t('generic.edit')}</Button>
          <h5>{i18n.t('user.edit.informationSubHeader')}</h5>
          <LabelAndText type="text" label={i18n.t('user.email')} value={user.email} />
          <LabelAndText type="text" label={i18n.t('user.firstname')} value={user.firstName} />
          <LabelAndText type="text" label={i18n.t('user.lastname')} value={user.lastName} />
          <LabelAndText type="date" label={i18n.t('user.dateOfBirtgh')} value={user.dateOfBirth} />
          <h5>{i18n.t('user.edit.addressSubHeader')}</h5>
          <LabelAndText type="text" label={i18n.t('user.country')} value={user.country} />
          <LabelAndText type="text" label={i18n.t('user.city')} value={user.city} />
          <LabelAndText type="text" label={i18n.t('user.postal')} value={user.postal} />
          <LabelAndText type="text" label={i18n.t('user.street')} value={user.street} />
          <LabelAndText type="text" label={i18n.t('user.number')} value={user.houseNumber} />
          <LabelAndText type="text" label={i18n.t('user.box')} value={user.postbox} />
          <LabelAndText type="select" options={getLanguages()} label={i18n.t('user.language')} value={user.language} />
          <h5>{i18n.t('user.edit.descriptionSubHeader')}</h5>
          <LabelAndText type="textarea" label={i18n.t('user.synopsis')} value={user.synopsis} />
        </form>
      </div>
    </div>
  );
};

User.propTypes = {
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(withRouter(User));
