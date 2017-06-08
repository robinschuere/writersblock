import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    if (this.props.isLink) {
      return (
        <Link
          className={this._getClasses()}
          to={this.props.linkTo}>
          {this.props.children}
        </Link>
      )
    }
    return (
      <button
        className={this._getClasses()}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }

  _getClasses() {
    var s = 'btn ';
    s += this.props.buttonType === 'isEdit' ? 'btn-success' : '';
    s += this.props.buttonType === 'isAdd' ? 'btn-default' : '';
    s += this.props.buttonType === 'isRemove' ? "btn-danger" : '';
    s += this.props.buttonType === 'isSave' ? "btn-primary" : '';
    return s;
  }
}

Button.propTypes = {
  buttonType: PropTypes.oneOf('isAdd', 'isRemove', 'isEdit', 'isSave'),
  chilren: PropTypes.node,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  linkTo: PropTypes.string,
}

export default Button;