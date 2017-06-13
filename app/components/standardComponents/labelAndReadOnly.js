import React from 'react';
import PropTypes from 'prop-types';

class LabelAndReadOnly extends React.Component {
  render(){
    return(
      <div className="form-group">
        <label className="col-sm-2" htmlFor={`labelandreadonly.${this.props.label}`}>{this.props.label}</label>
        <div className="col-sm-10">
          <p className="form-label" id={`labelandreadonly.${this.props.label}`}>{this.props.value}</p>
        </div>
      </div>
    );
  }
};

LabelAndReadOnly.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default LabelAndReadOnly;