import React from 'react';
import PropTypes from 'prop-types';

import Select from './select';
import TextArea from './textArea';
import TextInput from './textInput';
import NumberInput from './numberInput';
import PasswordInput from './passwordInput';
import DateInput from './dateInput';
import MailInput from './mailInput';
import Icon from './icon';

const typeToComponent = {
  select: Select,
  textarea: TextArea,
  text: TextInput,
  number: NumberInput,
  password: PasswordInput,
  date: DateInput,
  mail: MailInput,
};

const LabelAndField = (props) => {
  const {
    type, label, value, validatedOnce, required,
  } = props;
  const id = `${type}.${label}`;
  const Component = typeToComponent[type];
  if (!Component) {
    return null;
  }

  const alert = validatedOnce && !value && required;

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {alert && (
          <span>
            {' '}
            <Icon color="red" name="exclamation-circle" />
          </span>
        )}
      </label>
      <Component {...props} id={id} />

    </div>
  );
};

LabelAndField.propTypes = {
  type: PropTypes.oneOf(['select', 'number', 'text', 'textarea', 'password', 'date', 'mail']).isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  validatedOnce: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

LabelAndField.defaultProps = {
  required: false,
  onChange: undefined,
  onBlur: undefined,
};

export default LabelAndField;
