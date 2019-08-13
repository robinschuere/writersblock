import modelBuilder from './modelBuilder';
import constants from '../../constants';

const relations = modelBuilder(constants.relationDb);

const getAllByStoryId = storyId => relations.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

const getAllByCharacterId = characterId => relations.getAll()
  .then(rows => rows.filter(r => r.parentId === characterId || r.childId === characterId));

export default {
  ...relations,
  getAll: getAllByStoryId,
  getAllByStoryId,
  getAllByCharacterId,
};
