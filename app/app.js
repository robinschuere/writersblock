import React from 'react';
import ReactDom from 'react-dom';

//components
import NavBarContainer from './components/containers/navBarContainer';
import CharactersContainer from './components/containers/charactersContainer';
import CharacterDetailContainer from './components/containers/characterDetailContainer';

//Routing
import { Route, Switch, HashRouter } from 'react-router-dom';

//Store
import { createStore } from 'redux';
import reducers from './reducers/index';
import { Provider } from 'react-redux';

let store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducers);

ReactDom.render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <NavBarContainer />
        <Switch>
          <Route exact path="/" component={CharactersContainer} />
          <Route path="/character/:id" component={CharacterDetailContainer} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>
  , document.getElementById("app"))
