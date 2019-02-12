import characterReducer from './characterReducer';
import pouchReducer from './pouchReducer';

function BuildCatalog() {
  return {
    characters: [],
    pouchState: {
      charactersLoaded: false,
    },
    user: {},
  }
}

export default function reducers(state, action) {
  if (typeof state === 'undefined') {
    return BuildCatalog();
  }

  return {
    characters: characterReducer(state.characters, action),
    pouchState: pouchReducer(state.pouchState, action),
  };
}
