import userModel from './user';
import storyModel from './story';
import chapterModel from './chapter';
import characterModel from './character';
import storySettingModel from './storySetting';
import itemModel from './item';
import eventModel from './event';
import relationModel from './relation';
import constants from '../../../constants';

export default (table) => {
  switch (table) {
    case constants.userDb:
      return row => userModel(row);
    case constants.storyDb:
      return row => storyModel(row);
    case constants.chapterDb:
      return row => chapterModel(row);
    case constants.characterDb:
      return row => characterModel(row);
    case constants.storySettingsDb:
      return row => storySettingModel(row);
    case constants.itemDb:
      return row => itemModel(row);
    case constants.eventDb:
      return row => eventModel(row);
    case constants.relationDb:
      return row => relationModel(row);
    default:
      throw new Error('Table was not recognized');
  }
};
