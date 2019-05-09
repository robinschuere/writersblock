import { useReducer } from 'react';

import user from './user';
import story from './story';

const reducers = () => {
  const [userStore, userDispatch] = useReducer(user, {});
  const [storyStore, storyDispatch] = useReducer(story, {});

  const dispatch = (params) => {
    [userDispatch, storyDispatch]
      .forEach(dispatcher => dispatcher(params));
  };

  return {
    stores: {
      userStore,
      storyStore,
    },
    dispatch,
  };
};

export default reducers;
