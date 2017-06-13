import React from 'react';
import PropTypes from 'prop-types';
import { buildOptionList } from '../../helpers/formHelper';

class LabelAndField extends React.Component {
  _renderInputType() {
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
    if(this.props.type === 'textarea'){
      return (
        <textarea
          className="form-control"
          id={`labelandfield.${this.props.label}`}
          defaultValue={this.props.value}
          onChange={this.handleInputChange.bind(this)}
          onBlur={this.props.onBlur ? (e) => { this.props.onBlur(e) } : null}
          placeholder={this.props.placeholder}
          rows={this.props.rows || 5}/>
      );
    }
    return (
      <input
        type={this.props.type || 'text'}
        className="form-control"
        defaultValue={this.props.value}
        onChange={this.handleInputChange.bind(this)}
        onBlur={this.props.onBlur ? (e) => { this.props.onBlur(e) } : null}
        id={`labelandfield.${this.props.label}`}
        placeholder={this.props.placeholder}
        maxLength={this.props.type === 'text' ? (this.props.maxLength || 50) : null}
        min={this.props.type === 'number' ? (this.props.min || 0) : null}
        max={this.props.type === 'number' ? (this.props.max || 1000) : null} />
    );
  }

  handleInputChange(e){
    if(this.props.onChange){
      if(this.props.type === 'number'){
        const val = parseInt(e.target.value);
        if (val >= this.props.min && val <= this.props.max){
          this.props.onChange(val);
        } else if(val < this.props.min){
          this.props.onChange(this.props.min);
        } else if(val > this.props.max){
          this.props.onChange(this.props.max);
        }
      } else {
        this.props.onChange(e.target.value);
      }
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="col-sm-2 form-label" htmlFor={`labelandfield.${this.props.label}`}>{this.props.label}</label>
        <div className="col-sm-10">
          {this._renderInputType()}
        </div>
      </div>
    );
  }

};

LabelAndField.propTypes = {
  type: PropTypes.oneOf(['select', 'number', 'text', 'textarea']),
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })),
  rows: PropTypes.number,
}

export default LabelAndField;