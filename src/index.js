/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

import FormContainer from './js/containers/form';

const wrapper = document.getElementById('create-article-form');
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
