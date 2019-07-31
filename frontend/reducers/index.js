import { useReducer } from 'react';

import user from './user';
import story from './story';
import chapter from './chapter';
import character from './character';
import storySetting from './storySetting';
import item from './item';

const reducers = () => {
  const [userStore, userDispatch] = useReducer(user, {});
  const [storyStore, storyDispatch] = useReducer(story, {});
  const [chapterStore, chapterDispatch] = useReducer(chapter, {});
  const [characterStore, characterDispatch] = useReducer(character, {});
  const [storySettingStore, storySettingDispatch] = useReducer(storySetting, {});
  const [itemStore, itemDispatch] = useReducer(item, {});

  const dispatch = (params) => {
    [
      userDispatch,
      storyDispatch,
      chapterDispatch,
      storySettingDispatch,
      characterDispatch,
      itemDispatch,
    ]
      .forEach(dispatcher => dispatcher(params));
  };

  return {
    stores: {
      userStore,
      storyStore,
      chapterStore,
      storySettingStore,
      characterStore,
      itemStore,
    },
    dispatch,
  };
};

export default reducers;
