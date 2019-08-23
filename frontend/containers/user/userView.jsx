import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import Button from '../../components/generic/button';
import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import { getLanguages, getYesNoOptions } from '../../helpers';
import BackAndEditBar from '../../components/backAndEditBar';

const User = ({
  userStore, history, i18n, mobile,
}) => {
  const user = userStore.loggedInUser;
  const [completed, setCompleted] = useState(false);

  const handleChangeUser = () => {
    history.push('/user/edit');
  };

  const handleChangePassword = () => {
    history.push('/user/changepassword');
  };

  const handleRemove = () => {
    history.push('/user/delete');
  };

  const handleClose = () => {
    setCompleted(true);
  };

  if (completed) {
    return <Redirect to="/stories" />;
  }

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleChangeUser}
        onClose={handleClose}
        i18n={i18n}
      />
      <div className="container">
        <Button color="green" toRight onClick={handleChangePassword}>{i18n.t('credentials.passwordEdit.action')}</Button>
        <form className="form-horizontal">
          <h5>{i18n.t('credentials.header')}</h5>
          <LabelAndText type="text" label={i18n.t('credentials.username')} value={user.userName} />
          <LabelAndText type="password" label={i18n.t('credentials.password')} value="*****************" />
          <h5>{i18n.t('user.edit.informationSubHeader')}</h5>
          <LabelAndText type="text" label={i18n.t('user.email')} value={user.email} />
          <LabelAndText type="text" label={i18n.t('user.firstname')} value={user.firstName} />
          <LabelAndText type="text" label={i18n.t('user.lastname')} value={user.lastName} />
          <LabelAndText type="date" label={i18n.t('user.dateOfBirth')} value={user.dateOfBirth} />
          <LabelAndText type="select" options={getYesNoOptions(i18n)} label={i18n.t('user.persistLogin')} value={user.persistLogin} />
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
          <Button color="red" onClick={handleRemove}>{i18n.t('credentials.passwordEdit.remove')}</Button>
          <br />
        </form>
      </div>
    </Fragment>
  );
};

User.propTypes = {
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(User));
