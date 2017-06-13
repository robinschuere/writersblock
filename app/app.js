import React from 'react';
import ReactDom from 'react-dom';

//components
import AppContainer from './components/containers/appContainer';
import NavBarContainer from './components/containers/navBarContainer';
import CharactersContainer from './components/containers/charactersContainer';
import CharacterDetailContainer from './components/containers/characterDetailContainer';
import CharacterBasicContainer from './components/containers/characterBasicContainer';
import CharacterAttributesContainer from './components/containers/characterAttributesContainer';
import NotFoundContainer from './components/containers/notFoundContainer';
import DestroyContainer from './components/containers/destroyContainer';
import FooterContainer from './components/containers/footerContainer';
import ContactContainer from './components/containers/contactContainer';

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
            <Route exact path="/" component={AppContainer} />
            <Route path="/erase" component={DestroyContainer} />
            <Route path="/character/:id/attributes" component={CharacterAttributesContainer} />
            <Route path="/character/:id/basic" component={CharacterBasicContainer} />
            <Route path="/character/:id" component={CharacterDetailContainer} />
            <Route path="/character" component={CharactersContainer} />
            <Route path="/contact" component={ContactContainer} />
            <Route path="*" component={NotFoundContainer} />
        </Switch>
        <FooterContainer />
      </div>
    </HashRouter>
  </Provider>
  , document.getElementById("app"))
