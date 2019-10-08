import { constants } from '../constants';

export default (id, value, dispatch) => {
  dispatch({
    type: constants.actions.setSearch,
    id,
    value,
  });
};
