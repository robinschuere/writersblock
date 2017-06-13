import React from 'react';
import PropTypes from 'prop-types';
import LabelAndField from '../standardComponents/labelAndField';
import Form from '../standardComponents/form';
import { attributeList } from '../../constants';
import { getBasicAttribute } from '../../reducers/characterReducer';

class CharacterAttributeList extends React.Component {
  render() {
    const { character, onAttributeChange } = this.props;
    return (
      <Form isSave
        title="Attribute information"
        onSave={() => { this.props.onSave(character) }}
        linkTo={`/character/${this.props.character._id}`}>
        <div>
          {attributeList.map((att) => {
            const basicAttribute = character.basicAttributes ? character.basicAttributes.find((batt) => {
              return batt.attributeId === att.id;
            }) : { level: 0 };
            return (
              <LabelAndField
                type="number"
                label={att.name}
                value={basicAttribute ? basicAttribute.level : ''}
                placeholder="Give a value"
                onChange={(val) => { this.props.onAttributeChange(att.id, val) }}
                min={0}
                max={100} />
            )
          })}
        </div>
      </Form>
    );
  }
};

CharacterAttributeList.PropTypes = {
  character: PropTypes.object,
  onAttributeChange: PropTypes.func,
  onSave: PropTypes.func,
}

export default CharacterAttributeList;