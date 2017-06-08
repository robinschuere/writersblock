import React from 'react';
import PropTypes from 'prop-types';
import { buildOptionList } from '../../helpers/formHelper';

class LabelAndField extends React.Component {

  _renderInputType() {
    console.log(this.props);
    if (this.props.type === 'select') {
      return (
        <select
          className="form-control"
          id={`labelandfield.${this.props.label}`}
          defaultValue={this.props.value}
          onChange={(e) => { this.props.onChange(parseInt(e.target.value, 10)) }}>
          {this.props.options.map((option, index) => {
            return (
              <option
                value={option.value}
                key={`labelandfield.${this.props.label}.select.options.${index}`}>
                {option.label}
              </option>
            );
          })}
        </select>
      );
    }
    return (
      <input
        type={this.props.type || 'text'}
        className="form-control"
        defaultValue={this.props.value}
        onChange={this.props.onChange ? (e) => { this.props.onChange( this.props.type === 'number' ? parseInt(e.target.value) : e.target.value) } : null}
        onBlur={this.props.onBlur ? (e) => { this.props.onBlur(e) } : null}
        id={`labelandfield.${this.props.label}`}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        maxLength={this.props.type === 'text' ? (this.props.maxLength || 50) : null}
        min={this.props.type === 'number' ? (this.props.min || 0) : null}
        max={this.props.type === 'number' ? (this.props.max || 1000) : null} />
    );
  }

  render() {
    return (

      <div className="form-group" key={`labelandfield.${this.props.label}`}>
        <span>
          <label htmlFor={`labelandfield.${this.props.label}`}>{this.props.label}</label>
          {this._renderInputType()}
        </span>
      </div>
    );
  }

};

LabelAndField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'select']),
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }))
}

export default LabelAndField;