import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './icon';

class Button extends React.Component {
  getClasses() {
    const { color, toRight } = this.props;
    let s = 'btn btn-lg ';
    switch (color) {
      case 'green':
        s += 'btn-success ';
        break;
      case 'red':
        s += 'btn-danger ';
        break;
      case 'orange':
        s += 'btn-warning ';
        break;
      case 'black':
        s += 'btn-secondary ';
        break;
      default:
        s += 'btn-primary ';
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
};

Button.defaultProps = {
  color: 'blue',
  toRight: false,
  onClick: () => { },
  linkTo: '',
  icon: '',
  children: undefined,
};

export default Button;
