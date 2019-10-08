import { constants } from '../constants';

export default (id, value, dispatch) => {
  dispatch({
    type: constants.actions.setTabNavigation,
    id,
    value,
  });
};
