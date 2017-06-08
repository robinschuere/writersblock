import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../standardComponents/listItem';
import Form from '../standardComponents/form';
import { attributeList } from '../../constants';
import { getBasicAttribute } from '../../reducers/characterReducer';

class CharacterAttributeList extends React.Component {
  render() {
    const { character, onAttributeChange } = this.props;
    return (
      <Form
        title="Attribute information"
        onSave={() => { this.props.onSave(character) }}>
        <div>
          {attributeList.map((att) => {
            const basicAttribute = character.basicAttributes ? character.basicAttributes.find((batt) => {
              return batt.attributeId === att.id;
            }) : { level: 0 };
            return (
              <ListItem
                label={att.name}
                level={basicAttribute ? basicAttribute.level : ''}
                description={att.description}
                onChange={(val) => { onAttributeChange(att.id, val) }} />)
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