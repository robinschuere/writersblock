import characterReducer from './characterReducer';
import pouchReducer from './pouchReducer';
import userReducer from './userReducer';

function BuildCatalog() {
  return {
    characters: [],
    pouchState: {
      charactersLoaded: false,
      userLoggedIn: false,
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
    user: userReducer(state.user, action),
  };
}
