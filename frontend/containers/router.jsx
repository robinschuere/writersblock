import React from 'react';
import { Switch, HashRouter } from 'react-router-dom';

import reducers from '../reducers';

import Home from './home';
import NotFound from './notFound';
import About from './about';
import Contact from './contact';
import Login from './login';
import Register from './register';
import Stories from './stories';
import Story from './story';
import StoryDelete from './storyDelete';
import StoryGeneral from './storyGeneral';
import Logout from './logout';
import User from './user';
import UserEdit from './userEdit';
import PasswordChange from './passwordChange';

import PrivateRoute from '../components/privateRoute';
import PublicRoute from '../components/publicRoute';

const Router = () => {
  const { stores, dispatch } = reducers();

  return (
    <HashRouter>
      <Switch>
        <PublicRoute exact path="/" component={Home} stores={stores} dispatch={dispatch} />
        <PublicRoute path="/about" component={About} stores={stores} dispatch={dispatch} />
        <PublicRoute path="/contact" component={Contact} stores={stores} dispatch={dispatch} />
        <PublicRoute path="/login" component={Login} stores={stores} dispatch={dispatch} />
        <PublicRoute path="/register" component={Register} stores={stores} dispatch={dispatch} />

        <PrivateRoute path="/user/edit" component={UserEdit} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/user/changepassword" component={PasswordChange} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/user" component={User} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/stories/new" component={StoryGeneral} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/stories/:storyId/delete" component={StoryDelete} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/stories/:storyId/edit" component={StoryGeneral} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/stories/:storyId" component={Story} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/stories" component={Stories} stores={stores} dispatch={dispatch} />
        <PrivateRoute path="/logout" component={Logout} stores={stores} dispatch={dispatch} />

        <PublicRoute path="*" component={NotFound} stores={stores} dispatch={dispatch} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
