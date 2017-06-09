import React from 'react';
import PropTypes from 'prop-types';
import { characteristicList } from '../../constants';

class CharacterCharacteristicsList extends React.Component {
  render() {
    return (

    );
  }
};

CharacterCharacteristicsList.propTypes = {
  character: PropTypes.object,
  onCharacteristicChange: PropTypes.func,
  onSave: PropTypes.func,
};

export default CharacterCharacteristicsList;