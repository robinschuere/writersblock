/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

import Router from '../containers/router';

const wrapper = document.getElementById('blockers');
wrapper ? ReactDOM.render(<Router />, wrapper) : false;
