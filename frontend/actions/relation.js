import relationDb from '../helpers/pouch/relation';
import constants from '../constants';

export const addRelation = async (relation, dispatch) => {
  const newSetting = await relationDb.insert(relation);
  dispatch({
    type: constants.actions.addRelation,
    value: newSetting,
  });
};

export const updateRelation = async (relation, dispatch) => {
  const updatedRelation = await relationDb.update(relation);
  dispatch({
    type: constants.actions.updateRelation,
    value: updatedRelation,
  });
};

export const importRelation = async (relation, dispatch) => {
  const imported = await relationDb.importData(relation);
  dispatch({
    type: constants.actions.updateRelation,
    value: imported,
  });
};

export const removeRelation = async (relation, dispatch) => {
  await relationDb.remove(relation);
  dispatch({ type: constants.actions.removeRelation, value: relation });
};

export const getRelations = async (storyId, dispatch) => {
  const relations = await relationDb.getAll(storyId);
  dispatch({
    type: constants.actions.setRelations,
    value: relations,
  });
};

export const getRelationsByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getRelations(s.id, dispatch)));
};

export const removeRelationsFromStory = async (storyId, dispatch) => {
  const relations = await relationDb.getAll(storyId);
  await Promise.all(relations.map(c => relationDb.remove(c)));
  dispatch({
    type: constants.actions.removeRelations,
    value: relations,
  });
};

export const removeRelationsFromCharacter = async (characterId, dispatch) => {
  const relations = await relationDb.getAllByCharacterId(characterId);
  await Promise.all(relations.map(c => relationDb.remove(c)));
  dispatch({
    type: constants.actions.removeRelations,
    value: relations,
  });
};
