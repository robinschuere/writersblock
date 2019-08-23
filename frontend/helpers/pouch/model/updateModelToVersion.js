import constants from '../../../constants';

const updateModelToVersion = (row, tableName) => {
  const value = Object.assign(row);
  if (!value.dbVersion) {
    value.dbVersion = constants.dbVersion;
  }
  if (tableName === constants.storySettingsDb) {
    if (value.type === 'item') {
      value.type = 'itemType';
    }
  }

  return value;
};

export default updateModelToVersion;
