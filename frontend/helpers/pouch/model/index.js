import constants from '../../../constants';
import updateModelToVersion from './updateModelToVersion';

export default (table) => {
  switch (table) {
    case constants.userDb:
    case constants.storyDb:
    case constants.chapterDb:
    case constants.characterDb:
    case constants.storySettingsDb:
    case constants.itemDb:
    case constants.eventDb:
    case constants.relationDb:
    case constants.placeDb:
      return row => updateModelToVersion(row, table);
    default:
      throw new Error('Table was not recognized');
  }
};
