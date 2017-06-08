import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCharacterById } from '../../reducers/characterReducer';
import { updateCharacter, getCharacters } from '../../pouch/character';
import { saveCharacter, pushCharacters } from '../../actions/characterActions';
import CharacterBasic from '../characterComponents/characterBasic';
import CharacterAttributeList from '../characterComponents/characterAttributeList';
import { newCharacterBasicAttribute } from '../../constants';

class CharacterDetailContainer extends React.Component {
  componentDidMount() {
    if(!this.props.charactersLoaded){
      this.props.getCharacters();
    }
  }

  render() {
    return (
      <div>
        <CharacterBasic
          key={`characterdetail.${this.props.character ? this.props.character._id + '.' + this.props.character.lastUpdated.toISOString() : 0}`}
          character={this.props.character || {}}
          onSave={updateCharacter}
          onFirstNameChange={(val) => {this.handlePropChange('firstName', val);}}
          onLastNameChange={(val) => {this.handlePropChange('lastName', val);}}
          onBirthYearChange={(val) => {this.handlePropChange('birthYear', val);}}
          onGenderChange={(val) => {this.handlePropChange('genderId', val);}}
          onRaceChange={(val) => {this.handlePropChange('raceId', val);}}/>
        <CharacterAttributeList
          key={`characterattributelist.${this.props.character ? this.props.character._id + '.' + this.props.character.lastUpdated.toISOString() : 0}`}
          character={this.props.character || {}}
          onSave={updateCharacter}
          onAttributeChange={this.handleAttributeChange.bind(this)}/>
      </div>
    );
  }

  handlePropChange(field, val){
    this.props.updateCharacterProp(this.props.character, field, val);
  }

  handleAttributeChange(id, level){
    this.props.updateOrAddAttributeProp(this.props.character, id, level );
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
    updateCharacter: () => {
      const character = getCharacterById(state.characters, ownProps.match.params.id)
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
    updateCharacterProp: (character, field, value) => {
      character[field] = value;
      character.lastUpdated = moment();
      dispatch(saveCharacter(character));
    },
    updateOrAddAttributeProp: (character, attId, value) => {
      if(character.basicAttributes.find((att) => { return att.attributeId === attId;})){
        character.basicAttributes.forEach((att) => {
          if(att.attributeId === attId){
            att.level = value;
          }
        })
      } else{
        character.basicAttributes.push(newCharacterBasicAttribute(attId, value));
      }
      dispatch(saveCharacter(character));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterDetailContainer);
