import userDb from '../helpers/pouch/user';
import constants from '../constants';
import { getStories } from './story';

export const registerUser = async (user, dispatch) => {
  const newUser = await userDb.insert(user);
  dispatch({
    type: constants.actions.addUser,
    value: newUser,
  });
};

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

export const getUsers = async (user) => {
  const users = await userDb.getAll(user.id);
  return users;
};
