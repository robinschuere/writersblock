import React from 'react';
import { connect } from 'react-redux';
import CharactersList from '../characterComponents/characterList';
import { addCharacter, deleteCharacter, pushCharacters } from '../../actions/characterActions';
import { insertCharacter, removeCharacter, getCharacters } from '../../pouch/character';

class CharactersContainer extends React.Component {
  componentDidMount() {
    if (!this.props.charactersLoaded) {
      this.props.getCharacters();
    }
  }
  render() {
    return (
      <CharactersList
        characters={this.props.characters}
        onAdd={this.props.addCharacter}
        onRemove={this.props.removeCharacter} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    characters: state.characters,
    charactersLoaded: state.pouchState.charactersLoaded
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCharacter: () => {
      insertCharacter()
        .then((result) => {
          dispatch(addCharacter(result));
        });
    },
    removeCharacter: (character) => {
      removeCharacter(character)
        .then((result) => {
          dispatch(deleteCharacter(result));
        });
    },
    getCharacters: () => {
      getCharacters()
        .then((result) => {
          dispatch(pushCharacters(result));
        });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersContainer)
