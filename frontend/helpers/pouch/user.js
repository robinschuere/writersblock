import modelBuilder from './modelBuilder';
import { constants } from '../../constants';
import { isYes } from '..';

const users = modelBuilder(constants.userDb);

const getAll = async (user) => {
  const admin = await users.getById(user.id);
  if (admin.isAdmin) {
    const existingUsers = await users.getAll();
    return existingUsers;
  }
  return [];
};

const login = async (userName, password) => {
  const existingUsers = await users.getAll();
  return existingUsers.find(r => r.userName === userName && r.password === password);
};

const getPersistentUser = async () => {
  const existingUsers = await users.getAll();
  if (existingUsers.length === 1 && isYes(existingUsers[0].persistLogin)) {
    return existingUsers[0];
  }
  return null;
};

const getByUserName = async (userName) => {
  const existingUsers = await users.getAll();
  return !!existingUsers.find(r => r.userName === userName);
};

export default {
  ...users,
  getAll,
  getById: login,
  login,
  getPersistentUser,
  getByUserName,
};
