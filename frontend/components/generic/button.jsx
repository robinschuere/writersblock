import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './icon';

class Button extends React.Component {
  getClasses() {
    const {
      isEdit, isAdd, isRemove, isSave, toRight,
    } = this.props;
    let s = 'btn btn-lg ';
    s += isEdit ? 'btn-success ' : '';
    s += isAdd ? 'btn-default ' : '';
    s += isRemove ? 'btn-danger ' : '';
    s += isSave ? 'btn-primary ' : '';
    s += toRight ? 'pull-right ' : '';
    return s;
  }

  render() {
    const {
      isLink, linkTo, onClick, children, icon,
    } = this.props;
    if (isLink) {
      return (
        <Link
          className={this.getClasses()}
          to={linkTo}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        type="button"
        className={this.getClasses()}
        onClick={onClick}
      >
        {icon && (<Icon name={icon} />)}
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  isAdd: PropTypes.bool,
  isRemove: PropTypes.bool,
  isEdit: PropTypes.bool,
  isSave: PropTypes.bool,
  toRight: PropTypes.bool,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  linkTo: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  isAdd: true,
  isRemove: false,
  isEdit: false,
  isSave: false,
  toRight: false,
  onClick: () => { },
  isLink: false,
  linkTo: '',
  icon: '',
  children: undefined,
};


export default Button;
