import { dataModel } from '../constants';
import moment from 'moment';

export function updateCharacterAccordingToModel(character) {

  if(character.dataModel === undefined){
    character.raceId = 0;
    character.dataModel = '1.0.0';
  }
  if(character.dataModel === '1.0.0'){
    character.basicStats = undefined;
    character.basicChars = undefined;
    character.basicAttributes = [];
    character.basicCharacteristics = [];
    character.dataModel = '1.0.1';
  }
  if(character.dataModel === '1.0.1'){
    character.events = undefined;
    character.dataModel = '1.0.2';
  }

  //map moment and other values into correct value
  character.lastUpdated = moment(character.lastUpdated);

  if(character.dataModel === dataModel){
    return character;
  }
  console.error('===============¯\_(ツ)_/¯=====================');
  console.error('======Incorrect datamodel oncountered.=======');
  console.error('===============¯\_(ツ)_/¯=====================');
  return;
}