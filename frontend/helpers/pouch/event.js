import modelBuilder from './modelBuilder';
import constants from '../../constants';

const events = modelBuilder(constants.eventDb);

const getAllByStoryId = storyId => events.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

const getAllByCharacterId = characterId => events.getAll()
  .then(rows => rows.filter(r => r.characterId === characterId));

const getAllByChapterId = chapterId => events.getAll()
  .then(rows => rows.filter(r => r.chapterId === chapterId));

export default {
  ...events,
  getAll: getAllByStoryId,
  getAllByStoryId,
  getAllByCharacterId,
  getAllByChapterId,
};
