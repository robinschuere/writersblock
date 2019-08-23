import modelBuilder from './modelBuilder';
import constants from '../../constants';

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
  if (existingUsers.length === 1 && existingUsers[0].persistLogin === 'yes') {
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
