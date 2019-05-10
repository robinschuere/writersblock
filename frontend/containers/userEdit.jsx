import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { updateUser } from '../actions/user';

import LabelAndField from '../components/generic/labelAndField';
import LabelAndText from '../components/generic/labelAndText';
import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const message = `
The form below is used for setting your user information. Again, Writersblock does nothing wth this data.
`;

const UserEdit = ({
  dispatch, userStore,
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
    };
    await updateUser(updatedUser, dispatch);
  };

  if (completed) {
    return <Redirect to="/user" />;
  }

  return (
    <div>
      <BackAndSaveBar onAccept={save} onClose={() => setCompleted(true)} />
      <div className="container">
        <h4>{`Hello ${userStore.loggedInUser.userName}`}</h4>
        <p>{message}</p>
        <form className="form-horizontal">
          <h5>Personal information</h5>
          <LabelAndText type="text" label="Email" value={user.email} />
          <LabelAndField type="text" label="Firstname" onChange={setFirstName} value={firstName} />
          <LabelAndField type="text" label="Lastname" onChange={setLastName} value={lastName} />
          <LabelAndField type="date" label="Date of birth" onBlur={setDateOfBirth} value={dateOfBirth} />
          <h5>Address</h5>
          <LabelAndField type="text" label="Country" onChange={setCountry} value={country} />
          <LabelAndField type="text" label="City" onChange={setCity} value={city} />
          <LabelAndField type="text" label="Postalcode" onChange={setPostal} value={postal} />
          <LabelAndField type="text" label="Street" onChange={setStreet} value={street} />
          <LabelAndField type="text" label="Number" onChange={setHouseNumber} value={houseNumber} />
          <LabelAndField type="text" label="Box" onChange={setPostBox} value={postbox} />
          <h5>Personal description</h5>
          <LabelAndField type="textarea" label="Synopsis" onChange={setSynopsis} value={synopsis} />
        </form>
      </div>
    </div>
  );
};

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
};

export default WithNavBar(UserEdit);
