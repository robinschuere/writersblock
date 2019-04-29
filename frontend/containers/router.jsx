import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import { isMobile } from '../helpers';
import userReducer from '../reducers/user';

import NavBar from './navbar';
import Footer from './footer';
import Home from './home';
import NotFound from './notFound';
import About from './about';
import Contact from './contact';
import Login from './login';
import Register from './register';
import Stories from './stories';

const Router = () => {
  const [mobile, setMobile] = useState(isMobile());
  const [userStore, dispatch] = useReducer(userReducer, []);

  const updateDimensions = () => setMobile(isMobile());

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  });

  return (
    <HashRouter>
      <div>
        <NavBar mobile={mobile} />
        <div style={{ marginTop: 75 }} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" render={() => <Register userStore={userStore} dispatch={dispatch} />} />

          <Route path="/stories" component={Stories} />

          <Route path="*" component={NotFound} />
        </Switch>
        <div style={{ marginBottom: 150 }} />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default Router;
