import React from 'react';
import PropTypes from 'prop-types';
import LabelAndReadOnly from '../standardComponents/labelAndReadOnly';
import Button from '../standardComponents/button';
import Form from '../standardComponents/form';
import { getGenderById, getRaceById, getAttributeById } from '../../constants';

class CharacterDetail extends React.Component {
  render() {
    if (!this.props.character) {
      return null;
    }
    return (
      <div>
        <Form isEdit
          title="Basic information"
          linkTo={`/character/${this.props.character._id}/basic`}>
          <LabelAndReadOnly label="Name" value={`${this.props.character.firstName} ${this.props.character.lastName}`} />
          <LabelAndReadOnly label="BirthYear" value={this.props.character.birthYear} />
          <LabelAndReadOnly label="Gender" value={getGenderById(this.props.character.genderId).name} />
          <LabelAndReadOnly label="Race" value={getRaceById(this.props.character.raceId).name} />
          <LabelAndReadOnly label="Description" type='textarea' value={this.props.character.description} />
        </Form>
        <Form isEdit
          title="Attributes information"
          linkTo={`/character/${this.props.character._id}/attributes`}>
          {this.props.character.basicAttributes.map((att) => {
            return (<LabelAndReadOnly label={getAttributeById(att.attributeId).name} value={att.level} />)
          })}
        </Form>
      </div>
    );
  }
};

CharacterDetail.propTypes = {
  character: PropTypes.object,
}

export default CharacterDetail;