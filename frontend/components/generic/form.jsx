import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const Form = ({
  button, onClick, children, secondaryButton,
}) => (
  <form className="form-horizontal">
    {children}
    {secondaryButton}
    <Button
      color={button.color}
      onClick={onClick}
      toRight
    >
      {button.text}
    </Button>
  </form>
);

Form.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  button: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  secondaryButton: PropTypes.node,
};

Form.defaultProps = {
  children: null,
  secondaryButton: undefined,
};

export default Form;
