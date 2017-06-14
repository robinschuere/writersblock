import React from 'react';
import ReactDom from 'react-dom';

//component
import Container from './container';

//Store
import { createStore } from 'redux';
import reducers from './reducers/index';
import { Provider } from 'react-redux';

let store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducers);

ReactDom.render(
  <Provider store={store}>
    <Container />
  </Provider>
  , document.getElementById("app"))