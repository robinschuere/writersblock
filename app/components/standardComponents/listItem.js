import React from 'react';
import PropTypes from 'prop-types';
import LabelAndField from './labelAndField';

class ListItem extends React.Component {
  render() {
    return (
        <LabelAndField
          type="number"
          label={this.props.label}
          value={this.props.level}
          placeholder="Give a value"
          onChange={this.props.onChange}
          min={0}
          max={100} />
    );
  }
};

ListItem.propTypes = {
  level: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
  description: PropTypes.string,
}

export default ListItem;