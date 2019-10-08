import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './icon';

const Button = ({
  linkTo, onClick, children, icon, disabled, spinner,
  color, toRight, secondary, size,
}) => {
  const getClasses = () => {
    let s = 'btn btn-lg ';
    const outline = secondary ? 'outline-' : '';
    switch (color) {
      case 'green':
        s += `btn-${outline}success `;
        break;
      case 'red':
        s += `btn-${outline}danger `;
        break;
      case 'orange':
        s += `btn-${outline}warning `;
        break;
      case 'white':
        s += `btn-${outline}light `;
        break;
      case 'black':
        s += `btn-${outline}secondary `;
        break;
      default:
        s += `btn-${outline}primary `;
        break;
    }

    s += `btn-${size} `;

    s += toRight ? 'float-right ' : '';

    return s;
  };

  if (linkTo) {
    return (
      <Link
        className={getClasses()}
        to={linkTo}
        onClick={onClick}
      >
        {icon && (<Icon name={icon} />)}
        {icon && children && <span style={{ marginRight: 5 }} />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={getClasses()}
      onClick={onClick}
      disabled={disabled}
    >
      {spinner && <Icon name="spinner fa-pulse" />}
      {spinner && children && <span style={{ marginRight: 5 }} />}
      {icon && (<Icon name={icon} />)}
      {icon && children && <span style={{ marginRight: 5 }} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(['blue', 'red', 'orange', 'green', 'black', 'white']),
  toRight: PropTypes.bool,
  spinner: PropTypes.bool,
  onClick: PropTypes.func,
  linkTo: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Button.defaultProps = {
  color: 'blue',
  toRight: false,
  spinner: false,
  disabled: false,
  onClick: () => { },
  linkTo: '',
  icon: '',
  children: undefined,
  secondary: false,
  size: 'sm',
};

export default Button;
