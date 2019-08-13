import { useReducer } from 'react';

import user from './user';
import story from './story';
import chapter from './chapter';
import character from './character';
import storySetting from './storySetting';
import item from './item';
import event from './event';
import relation from './relation';

const reducers = () => {
  const [userStore, userDispatch] = useReducer(user, {});
  const [storyStore, storyDispatch] = useReducer(story, {});
  const [chapterStore, chapterDispatch] = useReducer(chapter, {});
  const [characterStore, characterDispatch] = useReducer(character, {});
  const [storySettingStore, storySettingDispatch] = useReducer(storySetting, {});
  const [itemStore, itemDispatch] = useReducer(item, {});
  const [eventStore, eventDispatch] = useReducer(event, {});
  const [relationStore, relationDispatch] = useReducer(relation, {});

  const dispatch = (params) => {
    [
      userDispatch,
      storyDispatch,
      chapterDispatch,
      storySettingDispatch,
      characterDispatch,
      itemDispatch,
      eventDispatch,
      relationDispatch,
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
      eventStore,
      relationStore,
    },
    dispatch,
  };
};

export default reducers;
