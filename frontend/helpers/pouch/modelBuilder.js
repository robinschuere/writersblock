import PouchDB from 'pouchdb';
import uuid from 'uuid';
import constants from '../../constants';
import model from './model';

export default (table) => {
  const database = new PouchDB(table);
  const checkValues = model(table);

  const getAll = async () => {
    const result = await database.allDocs({ include_docs: true });
    return result.rows.map(r => checkValues(r.doc));
  };

  const getById = async (id) => {
    const rows = await getAll();
    return rows.find(r => r.id === id);
  };

  const insert = async (row) => {
    const id = uuid();
    const toInsert = { ...row, _id: id, id };
    toInsert.createdAt = new Date().toISOString();
    toInsert.dbVersion = constants.dbVersion;
    const result = await database.put(toInsert);
    if (result.ok) {
      const record = await getById(result.id);
      return record;
    }
    return undefined;
  };

  const update = async (row) => {
    const toUpdate = { ...row };
    toUpdate.updatedAt = new Date().toISOString();
    const result = await database.put(toUpdate);
    if (result.ok) {
      const record = await getById(result.id);
      return record;
    }
    return undefined;
  };

  const importData = async (row) => {
    const exists = await getById(row.id);
    if (exists && new Date(exists.updatedAt) > new Date(row.updatedAt)) {
      return exists;
    }
    const result = await database.put(row, { force: true });
    if (result.ok) {
      const record = await getById(result.id);
      return record;
    }
    return undefined;
  };

  const remove = async (row) => {
    const toRemove = { ...row };
    toRemove.updated = new Date().toISOString();
    toRemove._deleted = true; // eslint-disable-line no-underscore-dangle
    const result = await database.put(toRemove);
    return result;
  };

  const drop = async () => {
    new PouchDB(table)
      .destroy()
      .catch((e) => {
        console.error(`An error occurred while removing a row for table ${table}`, e); // eslint-disable-line no-console
      });
  };

  return {
    insert,
    update,
    remove,
    drop,
    getAll,
    getById,
    importData,
  };
};
