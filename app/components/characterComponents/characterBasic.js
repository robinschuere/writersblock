import React from 'react';
import PropTypes from 'prop-types'
import Form from '../standardComponents/form';
import LabelAndField from '../standardComponents/labelAndField';
import { buildOptionList } from '../../helpers/formHelper';
import { genderList, raceList } from '../../constants';

class CharacterBasic extends React.Component {
  render() {
    return (
      <Form
        title="Basic information"
        onSave={() => {this.props.onSave(this.props.character)}}>
        <LabelAndField
          label="Firstname"
          value={this.props.character.firstName}
          placeholder="Give a firstname"
          onChange={this.props.onFirstNameChange} />
        <LabelAndField
          label="Lastname"
          value={this.props.character.lastName}
          placeholder="Give a lastname"
          onChange={this.props.onLastNameChange} />
        <LabelAndField
          label="BirthYear"
          value={this.props.character.birthYear}
          onChange={this.props.onBirthYearChange}
          type="number"
          min={-100000}
          max={100000} />
        <LabelAndField
          label="Gender"
          value={this.props.character.genderId}
          onChange={this.props.onGenderChange}
          type="select"
          options={buildOptionList(genderList)} />
        <LabelAndField
          label="Race"
          value={this.props.character.raceId}
          onChange={this.props.onRaceChange}
          type="select"
          options={buildOptionList(raceList)} />
      </Form>
    );
  }
}

CharacterBasic.propTypes = {
  character: PropTypes.object.isRequired,
  onFirstNameChange: PropTypes.func,
  onLastNameChange: PropTypes.func,
  onBirthYearChange: PropTypes.func,
  onGenderChange: PropTypes.func,
  onRaceChange: PropTypes.func,
  onSave: PropTypes.func,
}

export default CharacterBasic;