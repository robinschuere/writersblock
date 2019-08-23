import userDb from '../helpers/pouch/user';
import constants from '../constants';
import { getStories, removeStory } from './story';

export const updateUser = async (user, dispatch) => {
  const updatedUser = await userDb.update(user);
  dispatch({
    type: constants.actions.updateUser,
    value: updatedUser,
  });
};

export const loginUser = async (username, password, dispatch) => {
  const user = await userDb.login(username, password);
  if (user) {
    dispatch({
      type: constants.actions.loginUser,
      value: user,
    });
    getStories(user.id, dispatch);
    return user;
  }
  return undefined;
};

export const loginPersistentUser = async (dispatch) => {
  const persistentUser = await userDb.getPersistentUser();
  if (persistentUser) {
    dispatch({
      type: constants.actions.loginUser,
      value: persistentUser,
    });
    getStories(persistentUser.id, dispatch);
    return persistentUser;
  }
  return undefined;
};

export const getUsers = async (user) => {
  const users = await userDb.getAll(user.id);
  return users;
};

export const removeUser = async (user, dispatch) => {
  const stories = await getStories(user.id, dispatch);
  if (stories) {
    await Promise.all(stories.map(c => removeStory(c, dispatch)));
  }
  await userDb.remove(user);
  dispatch({ type: constants.actions.logoutUser });
};

export const registerUser = async (user, dispatch) => {
  const existingUser = await userDb.getByUserName(user.userName);
  if (existingUser) {
    return false;
  }
  const newUser = await userDb.insert(user);
  dispatch({
    type: constants.actions.addUser,
    value: newUser,
  });
  await loginUser(user.userName, user.password, dispatch);
  return true;
};
