const updateModelToVersion = (row) => {
  const value = Object.assign(row);
  if (!value.dbVersion) {
    value.dbVersion = '0.0.1';
  }

  return value;
};

export default updateModelToVersion;
