import constants from '../../../constants';

const updateModelToVersion = (row) => {
  const value = Object.assign(row);
  if (!value.dbVersion) {
    value.id = value._id; // eslint-disable-line no-underscore-dangle
    value.createdAt = value.created;
    value.updatedAt = new Date().toISOString();
    delete value.created;
    value.dbVersion = constants.dbVersion;
  }

  return value;
};

export default updateModelToVersion;
