import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Icon from './icon';

class Button extends React.Component {
  render() {
    if (this.props.isLink) {
      return (
        <Link
          className={this._getClasses()}
          to={this.props.linkTo}
          onClick={this.props.onClick}>
          {this.props.children}
        </Link>
      )
    }
    return (
      <button
        className={this._getClasses()}
        onClick={this.props.onClick}>
        {this.props.icon && (<Icon name={this.props.icon}/>)}
        {this.props.children}
      </button>
    )
  }

  _getClasses() {
    var s = 'btn btn-lg ';
    s += this.props.isEdit ? 'btn-success ' : '';
    s += this.props.isAdd ? 'btn-default ' : '';
    s += this.props.isRemove ? 'btn-danger ' : '';
    s += this.props.isSave ? 'btn-primary ' : '';
    s += this.props.isRight ? 'pull-right ' : '';
    return s;
  }
}

Button.propTypes = {
  isNavBar: PropTypes.bool,
  isAdd: PropTypes.bool,
  isRemove: PropTypes.bool,
  isEdit: PropTypes.bool,
  isSave: PropTypes.bool,
  toRight: PropTypes.bool,
  chilren: PropTypes.node,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  linkTo: PropTypes.string,
  icon: PropTypes.string,
}

export default Button;