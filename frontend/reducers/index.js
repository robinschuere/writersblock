import { useReducer } from 'react';

import user from './user';
import story from './story';
import chapter from './chapter';
import character from './character';
import storySetting from './storySetting';
import item from './item';
import event from './event';
import eventItem from './eventItem';
import eventTitle from './eventTitle';
import eventPower from './eventPower';
import eventRelation from './eventRelation';
import place from './place';
import power from './power';
import powerApplier from './powerApplier';
import search from './search';
import navigation from './navigation';

const reducers = () => {
  const [userStore, userDispatch] = useReducer(user, {});
  const [storyStore, storyDispatch] = useReducer(story, {});
  const [chapterStore, chapterDispatch] = useReducer(chapter, {});
  const [characterStore, characterDispatch] = useReducer(character, {});
  const [storySettingStore, storySettingDispatch] = useReducer(storySetting, {});
  const [itemStore, itemDispatch] = useReducer(item, {});
  const [eventStore, eventDispatch] = useReducer(event, {});
  const [eventTitleStore, eventTitleDispatch] = useReducer(eventTitle, {});
  const [eventItemStore, eventItemDispatch] = useReducer(eventItem, {});
  const [eventPowerStore, eventPowerDispatch] = useReducer(eventPower, {});
  const [eventRelationStore, eventRelationDispatch] = useReducer(eventRelation, {});
  const [placeStore, placeDispatch] = useReducer(place, {});
  const [powerStore, powerDispatch] = useReducer(power, {});
  const [powerApplierStore, powerApplierDispatch] = useReducer(powerApplier, {});
  const [searchStore, searchDispatch] = useReducer(search, {});
  const [navigationStore, navigationDispatch] = useReducer(navigation, {});

  const dispatch = (params) => {
    [
      userDispatch,
      storyDispatch,
      chapterDispatch,
      characterDispatch,
      storySettingDispatch,
      itemDispatch,
      eventDispatch,
      eventTitleDispatch,
      eventItemDispatch,
      eventPowerDispatch,
      eventRelationDispatch,
      placeDispatch,
      powerDispatch,
      powerApplierDispatch,
      searchDispatch,
      navigationDispatch,
    ]
      .forEach(dispatcher => dispatcher(params));
  };

  return {
    stores: {
      userStore,
      storyStore,
      chapterStore,
      characterStore,
      storySettingStore,
      itemStore,
      eventStore,
      eventTitleStore,
      eventItemStore,
      eventPowerStore,
      eventRelationStore,
      placeStore,
      powerStore,
      powerApplierStore,
      searchStore,
      navigationStore,
    },
    dispatch,
  };
};

export default reducers;
