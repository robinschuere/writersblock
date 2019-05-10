import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';

const message = `
The form below is used for setting your user information. Again, Writersblock does nothing wth this data.
`;

const User = ({
  userStore, history,
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
        <h4>{`Hello ${userStore.loggedInUser.userName}`}</h4>
        <p>{message}</p>
        <form className="form-horizontal">
          <h5>Registration information</h5>
          <LabelAndText type="text" label="Username" value={user.userName} />
          <LabelAndText type="password" label="Password" value="*****************" />
          <Button color="green" toRight onClick={handleChangePassword}>change Password</Button>
          <h5>Personal information</h5>
          <LabelAndText type="text" label="Email" value={user.email} />
          <LabelAndText type="text" label="Firstname" value={user.firstName} />
          <LabelAndText type="text" label="Lastname" value={user.lastName} />
          <LabelAndText type="date" label="Date of birth" value={user.dateOfBirth} />
          <h5>Address</h5>
          <LabelAndText type="text" label="Country" value={user.country} />
          <LabelAndText type="text" label="City" value={user.city} />
          <LabelAndText type="text" label="Postalcode" value={user.postal} />
          <LabelAndText type="text" label="Street" value={user.street} />
          <LabelAndText type="text" label="Number" value={user.houseNumber} />
          <LabelAndText type="text" label="Box" value={user.postbox} />
          <h5>Personal description</h5>
          <LabelAndText type="textarea" label="Synopsis" value={user.synopsis} />
          <Button color="green" toRight onClick={handleChangeUser}>Change personal information</Button>
        </form>
      </div>
    </div>
  );
};

User.propTypes = {
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default WithNavBar(withRouter(User));
