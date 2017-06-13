import React from 'react';
import PropTypes from 'prop-types'
import Button from '../standardComponents/button';
import { isMobile } from '../../helpers/formHelper';

class CharacterList extends React.Component {
  constructor(){
    super();
    this.state = { mobile: true};
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    this.setState({ mobile: isMobile() });
  }
  render() {
    return (
      <div key={`characterlist.${this.state.mobile}`}>
        <Button isAdd onClick={() => { this.props.onAdd(); }}>{"Add"}</Button>
        <table className="table table-hover table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>{"Firstname"}</th>
              <th>{"Lastname"}</th>
              {!this.state.mobile && <th>{"Birthyear"}</th>}
              {!this.state.mobile && <th>{"Last updated"}</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.characters && this.props.characters.map((character, index) => {
              return (
                <tr key={`characterList.item.${index}`}>
                  <td><Button isLink linkTo={`/character/${character._id}`} isEdit>{"Edit"}</Button></td>
                  <td>{character.firstName}</td>
                  <td>{character.lastName}</td>
                  {!this.state.mobile && <td>{character.birthYear}</td>}
                  {!this.state.mobile && <td>{character.lastUpdated.format('DD/MM/YYYY HH:mm')}</td>}
                  <td><Button isRemove onClick={() => { this.props.onRemove(character); }}>{"Remove"}</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.object
  ),
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
}

export default CharacterList;

