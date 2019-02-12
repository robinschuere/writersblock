import React from 'react';
import { connect } from 'react-redux';

// components
import { Route, Switch, HashRouter } from 'react-router-dom';
import AppContainer from './appContainer';
import NavBarContainer from './navBarContainer';
import CharactersContainer from './charactersContainer';
import CharacterDetailContainer from './characterDetailContainer';
import CharacterBasicContainer from './characterBasicContainer';
import CharacterAttributesContainer from './characterAttributesContainer';
import NotFoundContainer from './notFoundContainer';
import DestroyContainer from './destroyContainer';
import FooterContainer from './footerContainer';
import ContactContainer from './contactContainer';

// Routing

const Container = () => (
  <HashRouter>
    <div>
      <NavBarContainer />
      <div className="page-header">
        <h1>
          Writers Block
          {' '}
          <small>~ The app for building better stories ~</small>
        </h1>
      </div>
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
);

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
