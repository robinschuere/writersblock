import React from 'react';
import ReactDom from 'react-dom';

//components
import NavBarContainer from './components/containers/navBarContainer';
import CharactersContainer from './components/containers/charactersContainer';
import CharacterDetailContainer from './components/containers/characterDetailContainer';
import CharacterBasicContainer from './components/containers/characterBasicContainer';
import CharacterAttributesContainer from './components/containers/characterAttributesContainer';
import NotFoundContainer from './components/containers/NotFoundContainer';

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
          <Route path="/character/:id/attributes" component={CharacterAttributesContainer} />
          <Route path="/character/:id/basic" component={CharacterBasicContainer} />
          <Route path="/character/:id" component={CharacterDetailContainer} />
          <Route path="*" component={NotFoundContainer}/>
        </Switch>
      </div>
    </HashRouter>
  </Provider>
  , document.getElementById("app"))
