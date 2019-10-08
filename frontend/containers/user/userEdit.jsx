import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { updateUser } from '../../actions/user';
import { getLanguages, getYesNoOptions, useField } from '../../helpers';

import LabelAndField from '../../components/generic/labelAndField';
import LabelAndText from '../../components/generic/labelAndText';
import WithNavBar from '../../components/hoc/withNavBar';
import BackAndSaveBar from '../../components/backAndSaveBar';

const UserEdit = ({
  dispatch, userStore, i18n, mobile,
}) => {
  const user = userStore.loggedInUser;

  const [updatedUser, setUserProps] = useField(user);

  const [completed, setCompleted] = useState(false);

  const save = async () => {
    await updateUser(updatedUser, dispatch);
    setCompleted(true);
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
      <div className="container-fluid">
        <h4>{i18n.t('user.edit.header', { username: userStore.loggedInUser.userName })}</h4>
        <p>{i18n.t('user.edit.message')}</p>
        <form className="form-horizontal">
          <h5>{i18n.t('user.edit.informationSubHeader')}</h5>
          <LabelAndText type="text" label={i18n.t('user.email')} placeholder={i18n.t('user.email')} value={user.email} />
          <LabelAndField type="text" label={i18n.t('user.firstname')} placeholder={i18n.t('user.placeholders.firstname')} {...setUserProps('firstName')} />
          <LabelAndField type="text" label={i18n.t('user.lastname')} placeholder={i18n.t('user.placeholders.lastname')} {...setUserProps('lastName')} />
          <LabelAndField type="date" label={i18n.t('user.dateOfBirth')} {...setUserProps('dateOfBirth', true)} />
          <LabelAndField type="toggle" name="persist" options={getYesNoOptions(i18n)} label={i18n.t('user.persistLogin')} {...setUserProps('persistLogin')} />
          <h5>{i18n.t('user.edit.addressSubHeader')}</h5>
          <LabelAndField type="text" label={i18n.t('user.country')} placeholder={i18n.t('user.placeholders.country')} {...setUserProps('country')} />
          <LabelAndField type="text" label={i18n.t('user.city')} placeholder={i18n.t('user.placeholders.city')} {...setUserProps('city')} />
          <LabelAndField type="text" label={i18n.t('user.postal')} placeholder={i18n.t('user.placeholders.postal')} {...setUserProps('postal')} />
          <LabelAndField type="text" label={i18n.t('user.street')} placeholder={i18n.t('user.placeholders.street')} {...setUserProps('street')} />
          <LabelAndField type="text" label={i18n.t('user.number')} placeholder={i18n.t('user.placeholders.number')} {...setUserProps('houseNumber')} />
          <LabelAndField type="text" label={i18n.t('user.box')} placeholder={i18n.t('user.placeholders.box')} {...setUserProps('postbox')} />
          <LabelAndField type="select" options={getLanguages()} label={i18n.t('user.language')} {...setUserProps('language')} />
          <h5>{i18n.t('user.edit.descriptionSubHeader')}</h5>
          <LabelAndField type="textarea" label={i18n.t('user.synopsis')} placeholder={i18n.t('user.placeholders.synopsis')} {...setUserProps('synopsis')} />
        </form>
      </div>
    </Fragment>
  );
};

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(UserEdit);
