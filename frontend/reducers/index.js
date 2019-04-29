import { useReducer } from 'react';

import user from './user';

const reducers = () => {
  const [userStore, userDispatch] = useReducer(user, []);

  const dispatch = (params) => {
    [userDispatch]
      .forEach(dispatcher => dispatcher(params));
  };

  return {
    stores: {
      userStore,
    },
    dispatch,
  };
};

export default reducers;
