import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './icon';

class Button extends React.Component {
  getClasses() {
    const { color, toRight, secondary } = this.props;
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

    s += toRight ? 'float-right ' : '';

    return s;
  }

  render() {
    const {
      linkTo, onClick, children, icon,
    } = this.props;
    if (linkTo) {
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
  color: PropTypes.oneOf('blue', 'red', 'orange', 'green', 'black'),
  toRight: PropTypes.bool,
  onClick: PropTypes.func,
  linkTo: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  color: 'blue',
  toRight: false,
  onClick: () => { },
  linkTo: '',
  icon: '',
  children: undefined,
  secondary: false,
};

export default Button;
