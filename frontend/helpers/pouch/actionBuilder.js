import PouchDB from 'pouchdb';

export default (table) => {
  const database = new PouchDB(table);

  const insert = (row) => {
    const toInsert = { ...row };
    toInsert.created = new Date().toISOString();
    return database.put(toInsert)
      .catch(() => {
        console.error(`An error occurred while saving a row for table ${table}`);
        return row;
      });
  };

  const update = (row) => {
    const toUpdate = { ...row };
    toUpdate.updated = new Date().toISOString();
    return database.put(toUpdate)
      .catch(() => {
        console.error(`An error occurred while updating a row for table ${table}`);
        return row;
      });
  };

  const remove = (row) => {
    const toRemove = { ...row };
    toRemove.updated = new Date().toISOString();
    toRemove._deleted = true; // eslint-disable-line no-underscore-dangle
    return database.put(toRemove)
      .catch(() => {
        console.error(`An error occurred while removing a row for table ${table}`);
        return row;
      });
  };

  const getAll = () => database.allDocs({ include_docs: true })
    .then(result => result.rows);

  const drop = () => {
    new PouchDB(table)
      .destroy()
      .catch(() => {
        console.error(`An error occurred while removing a row for table ${table}`);
      });
  };

  const getById = id => getAll().then(rows => rows.find(r => r.id === id));

  return {
    insert,
    update,
    remove,
    drop,
    getAll,
    getById,
  };
};
