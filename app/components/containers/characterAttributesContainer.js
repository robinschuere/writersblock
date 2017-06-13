import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCharacterById } from '../../reducers/characterReducer';
import { updateCharacter, getCharacters } from '../../pouch/character';
import { saveCharacter, pushCharacters } from '../../actions/characterActions';
import CharacterBasic from '../characterComponents/characterBasic';
import CharacterAttributeList from '../characterComponents/characterAttributeList';
import CharacterDetail from '../characterComponents/characterDetail';
import { newCharacterBasicAttribute } from '../../constants';

class CharacterAttributesContainer extends React.Component {
  componentDidMount() {
    if (!this.props.charactersLoaded) {
      this.props.getCharacters();
    }
  }

  render() {
    return (
      <CharacterAttributeList
        key={`characterattributelist.${this.props.character ? this.props.character._id + '.' + this.props.character.lastUpdated.toISOString() : 0}`}
        character={this.props.character || {}}
        onSave={this.props.updateCharacter}
        onAttributeChange={this.handleAttributeChange.bind(this)} />
    );
  }

  handleAttributeChange(id, level) {
    this.props.updateOrAddAttributeProp(this.props.character, id, level);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    character: getCharacterById(state.characters, ownProps.match.params.id),
    charactersLoaded: state.pouchState.charactersLoaded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCharacter: (character) => {
      updateCharacter(character)
        .then((result) => {
          dispatch(saveCharacter(result));
        })
    },
    getCharacters: () => {
      getCharacters()
        .then((result) => {
          dispatch(pushCharacters(result));
        });
    },
    updateOrAddAttributeProp: (character, attId, value) => {
      if (character.basicAttributes.find((att) => { return att.attributeId === attId; })) {
        character.basicAttributes.forEach((att) => {
          if (att.attributeId === attId) {
            att.level = value;
          }
        })
      } else {
        character.basicAttributes.push(newCharacterBasicAttribute(attId, value));
      }
      dispatch(saveCharacter(character));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterAttributesContainer);
