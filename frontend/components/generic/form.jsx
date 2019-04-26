import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const Form = ({
  button, onClick, children,
}) => (
  <form className="form-horizontal needs-validation" noValidate style={{ marginBottom: 75 }}>
    {children}
    <Button
      color={button.color}
      onClick={onClick}
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
};

Form.defaultProps = {
  children: null,
};

export default Form;
