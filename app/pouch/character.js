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
      toAdd._rev = result.rev;
      return toAdd;
    })
    .catch((err) => {
      console.log('error: ', err);
      return toAdd;
    });
};

export function updateCharacter(character) {
  character.lastUpdated = moment();

  return db.put(JSON.parse(JSON.stringify(character)))
    .then((result) => {
      character._rev = result.rev;
      return character;
    })
    .catch((err) => {
      console.log('error: ', err);
      return character;
    });
};

export function removeCharacter(character) {
  character._deleted = true;
  return db.put(JSON.parse(JSON.stringify(character)))
    .then((result) => {
      return character._id;
    })
    .catch((err) => {
      console.log('error: ', err);
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