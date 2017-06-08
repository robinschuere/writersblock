import React from 'react';
import PropTypes from 'prop-types';
import LabelAndField from './labelAndField';

class ListItem extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className='col-xs-6' key={`listitem.${this.props.label}`}>
          <LabelAndField
            type="number"
            label={this.props.label}
            value={this.props.level}
            placeholder="Give a value"
            onChange={this.props.onChange}
            min={0}
            max={100} />
      </div>
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