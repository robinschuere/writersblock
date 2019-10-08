import { constants } from '../../../constants';

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
  if (tableName === constants.storyDb) {
    if (!value.status) {
      value.status = constants.storyStatusses.draft;
    }
    if (value.markdown) {
      value.withMarkdown = value.markdown;
      delete value.markdown;
    }
    if (!value.traitMaximum) {
      value.traitMaximum = 100;
    }
  }
  if (tableName === constants.itemDb) {
    if (value.reqStatisticTraits) {
      value.statisticRequiredTraits = JSON.parse(JSON.stringify(value.reqStatisticTraits));
      delete value.reqStatisticTraits;
    }
  }
  if (tableName === constants.storyDb) {
    if (!value.withAuthorDescription) {
      value.withAuthorDescription = constants.yesNo.yes;
    }
  }
  if (tableName === constants.chapterDb) {
    if (value.markdown) {
      delete value.markdown;
    }
  }
  if (tableName === constants.eventDb) {
    if (!value.setup) {
      value.setup = {};
    }
    if (value.powers) {
      delete value.powers;
    }
    if (value.items) {
      delete value.items;
    }
    if (value.titles) {
      delete value.titles;
    }
    if (value.relations) {
      delete value.relations;
    }
  }
  if (tableName === constants.powerDb) {
    if (value.appliers) {
      delete value.appliers;
    }
  }

  return value;
};

export default updateModelToVersion;
