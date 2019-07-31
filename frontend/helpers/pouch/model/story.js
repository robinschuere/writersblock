import constants from '../../../constants';

const updateModelToVersion = (row) => {
  const value = Object.assign(row);
  if (!value.dbVersion) {
    value.dbVersion = constants.dbVersion;
  }

  return value;
};

export default updateModelToVersion;
