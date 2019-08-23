import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TextInput from './textInput';

const SearchField = ({ value, onChange, i18n }) => (
  <Fragment>
    <span
      className="fa fa-search"
      style={{
        position: 'absolute',
        zIndex: 2,
        display: 'block',
        width: '2.375rem',
        height: '2.375rem',
        lineHeight: '2.375rem',
        textAlign: 'center',
        pointerEvents: 'none',
        color: '#aaa',
      }}
    />
    <TextInput style={{ paddingLeft: '2.375rem' }} value={value} onChange={onChange} placeholder={i18n.t('generic.search')} />
  </Fragment>
);

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default SearchField;
