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

export default {
  ...users,
  getAll,
  getById: login,
  login,
};
