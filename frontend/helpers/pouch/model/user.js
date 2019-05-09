const updateModelToVersion = (row) => {
  const value = Object.assign(row);
  if (!value.dbVersion) {
    value.id = value._id; // eslint-disable-line no-underscore-dangle
    value.createdAt = value.created;
    value.updatedAt = new Date().toISOString();
    delete value.created;
    value.dbVersion = '0.0.1';
  }

  return value;
};

export default updateModelToVersion;
