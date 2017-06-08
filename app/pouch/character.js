import { newCharacter } from '../constants';
import PouchDB from 'pouchdb';
import moment from 'moment';
import { updateCharacterAccordingToModel } from '../helpers/dataModel';
import { createNotification } from '../helpers/formHelper';
const db = new PouchDB('my_characters');

export function insertCharacter() {

  const toAdd = newCharacter();

  return db.put(JSON.parse(JSON.stringify(toAdd)))
    .then((result) => {
      createNotification('info', 'The character was created.');
      toAdd._rev = result.rev;
      return toAdd;
    })
    .catch((err) => {
      createNotification('error', 'An error occurred while creating the character.');
      return toAdd;
    });
};

export function updateCharacter(character) {
  character.lastUpdated = moment();

  return db.put(JSON.parse(JSON.stringify(character)))
    .then((result) => {
      createNotification('info', 'The character was updated.');
      character._rev = result.rev;
      return character;
    })
    .catch((err) => {
      createNotification('error', 'An error occurred while updating the character.');
      return character;
    });
};

export function removeCharacter(character) {
  character._deleted = true;
  return db.put(JSON.parse(JSON.stringify(character)))
    .then((result) => {
      createNotification('info', 'The character was removed.');
      return character._id;
    })
    .catch((err) => {
      createNotification('error', 'An error occurred while removing the character.');
      return character._id;
    });
};

export function getCharacters() {
  return db.allDocs({ include_docs: true})
    .then((result) => {
      return result.rows.map((character) => {
        return updateCharacterAccordingToModel(character.doc);
      })
    });
};