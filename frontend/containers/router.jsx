import React, { useState } from 'react';
import { Switch, HashRouter } from 'react-router-dom';

import reducers from '../reducers';

import Home from './home';
import NotFound from './notFound';
import About from './about';
import Version from './version';
import Contact from './contact';
import Login from './login';
import Register from './register';
import Stories from './stories';
import Story from './story';
import StoryDelete from './storyDelete';
import StoryEdit from './storyEdit';
import Chapters from './chapters';
import ChapterEdit from './chapterEdit';
import ChapterDelete from './chapterDelete';
import Chapter from './chapter';
import Characters from './characters';
import CharacterEdit from './characterEdit';
import CharacterDelete from './characterDelete';
import Character from './character';
import Items from './items';
import ItemEdit from './itemEdit';
import ItemDelete from './itemDelete';
import Item from './item';
import StorySettings from './storySettings';
import StorySettingEdit from './storySettingEdit';
import StorySettingDelete from './storySettingDelete';
import StorySetting from './storySetting';
import Logout from './logout';
import User from './user';
import UserEdit from './userEdit';
import PasswordChange from './passwordChange';
import EventEdit from './eventEdit';
import EventDelete from './eventDelete';
import RelationEdit from './relationEdit';
import RelationDelete from './relationDelete';
import Import from './import';

import i18n from '../i18n';
import PrivateRoute from '../components/privateRoute';
import PublicRoute from '../components/publicRoute';
import { exportStoryToJson, readFileAsync, importStoryFromJson } from '../helpers/exportImport';

const Router = () => {
  const [language, setLanguage] = useState(i18n.language);
  const { stores, dispatch } = reducers();

  const handleChangeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  if (!!stores.userStore.loggedInUser && stores.userStore.loggedInUser.language !== language) {
    handleChangeLanguage(stores.userStore.loggedInUser.language);
  }

  const props = {
    stores,
    dispatch,
    language,
    i18n,
    changeLanguage: handleChangeLanguage,
  };

  const handleImportFromJSON = async (path) => {
    const data = await readFileAsync(path);

    await importStoryFromJson(JSON.parse(data), stores, dispatch);
  };

  const handleExportToJSON = (item) => {
    const data = exportStoryToJson(item.id, stores);
    const element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
    const fileName = stores.storyStore[item.id].title.toLowerCase().replace(/[^a-zA-Z]/g, '_');
    element.setAttribute('download', `${fileName}.wbson`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <HashRouter key={`writersblock_${language}`}>
      <Switch>
        <PublicRoute exact path="/" component={Home} {...props} />
        <PublicRoute path="/about" component={About} {...props} />
        <PublicRoute path="/contact" component={Contact} {...props} />
        <PublicRoute path="/version" component={Version} {...props} />
        <PublicRoute path="/login" component={Login} {...props} />
        <PublicRoute path="/register" component={Register} {...props} />

        <PrivateRoute path="/import" component={Import} {...props} importFromJson={handleImportFromJSON} />
        <PrivateRoute path="/user/edit" component={UserEdit} {...props} />
        <PrivateRoute path="/user/changepassword" component={PasswordChange} {...props} />
        <PrivateRoute path="/user" component={User} {...props} />
        <PrivateRoute path="/stories/new" component={StoryEdit} {...props} />

        <PrivateRoute path="/stories/:storyId/:storyRoute/:parentId/events/new" component={EventEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/:storyRoute/:parentId/events/:eventId/delete" component={EventDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/:storyRoute/:parentId/events/:eventId" component={EventEdit} {...props} />

        <PrivateRoute path="/stories/:storyId/chapters/new" component={ChapterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters/:chapterId/edit" component={ChapterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters/:chapterId/delete" component={ChapterDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters/:chapterId" component={Chapter} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters" component={Chapters} {...props} />

        <PrivateRoute path="/stories/:storyId/characters/:characterId/relations/new" component={RelationEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/relations/:relationId/delete" component={RelationDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/relations/:relationId" component={RelationEdit} {...props} />

        <PrivateRoute path="/stories/:storyId/characters/new" component={CharacterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/edit" component={CharacterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/delete" component={CharacterDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId" component={Character} {...props} />
        <PrivateRoute path="/stories/:storyId/characters" component={Characters} {...props} />

        <PrivateRoute path="/stories/:storyId/items/new" component={ItemEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/items/:itemId/edit" component={ItemEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/items/:itemId/delete" component={ItemDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/items/:itemId" component={Item} {...props} />
        <PrivateRoute path="/stories/:storyId/items" component={Items} {...props} />

        <PrivateRoute path="/stories/:storyId/storySettings/new" component={StorySettingEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings/:storySettingId/edit" component={StorySettingEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings/:storySettingId/delete" component={StorySettingDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings/:storySettingId" component={StorySetting} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings" component={StorySettings} {...props} />

        <PrivateRoute path="/stories/:storyId/delete" component={StoryDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/edit" component={StoryEdit} {...props} />
        <PrivateRoute path="/stories/:storyId" component={Story} {...props} />
        <PrivateRoute path="/stories" exportToJSON={handleExportToJSON} component={Stories} {...props} />
        <PrivateRoute path="/logout" component={Logout} {...props} />

        <PublicRoute path="*" component={NotFound} {...props} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
