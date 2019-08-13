import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addRelation:
    case constants.actions.updateRelation:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeRelation:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setRelations: {
      const newState = { ...state };
      action.value.forEach((relation) => {
        newState[relation.id] = relation;
      });
      return newState;
    }
    case constants.actions.emptyRelations: {
      return {};
    }
    case constants.actions.removeRelations: {
      const newState = { ...state };
      action.value.forEach((relation) => {
        newState[relation.id] = undefined;
      });
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;

export const getRelationsByCharacter = (store, characterId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.parentId === characterId || f.childId === characterId);
