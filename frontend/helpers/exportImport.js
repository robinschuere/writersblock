import { getChaptersByStory } from '../reducers/chapter';
import { getCharactersByStory } from '../reducers/character';
import { getItemsByStory } from '../reducers/item';
import { getEventsByStory } from '../reducers/event';
import { getEventItemsByStory } from '../reducers/eventItem';
import { getEventTitlesByStory } from '../reducers/eventTitle';
import { getEventRelationsByStory } from '../reducers/eventRelation';
import { getEventPowersByStory } from '../reducers/eventPower';
import { getPlacesByStory } from '../reducers/place';
import { getPowersByStory } from '../reducers/power';
import { getPowerAppliersByStory } from '../reducers/powerApplier';
import { getStorySettingsByStory } from '../reducers/storySetting';

import { importStory } from '../actions/story';
import { importCharacter } from '../actions/character';
import { importChapter } from '../actions/chapter';
import { importItem } from '../actions/item';
import { importStorySetting } from '../actions/storySetting';
import { importEvent } from '../actions/event';
import { importEventItem } from '../actions/eventItem';
import { importEventTitle } from '../actions/eventTitle';
import { importEventRelation } from '../actions/eventRelation';
import { importEventPower } from '../actions/eventPower';
import { importPlace } from '../actions/place';
import { importPower } from '../actions/power';
import { importPowerApplier } from '../actions/powerApplier';

export const exportStoryToJson = (storyId, stores) => {
  const exportData = {
    story: stores.storyStore[storyId],
    chapters: getChaptersByStory(stores.chapterStore, storyId),
    characters: getCharactersByStory(stores.characterStore, storyId),
    items: getItemsByStory(stores.itemStore, storyId),
    events: getEventsByStory(stores.eventStore, storyId),
    eventItems: getEventItemsByStory(stores.eventItemStore, storyId),
    eventTitles: getEventTitlesByStory(stores.eventTitleStore, storyId),
    eventRelations: getEventRelationsByStory(stores.eventRelationStore, storyId),
    eventPowers: getEventPowersByStory(stores.eventPowerStore, storyId),
    storySettings: getStorySettingsByStory(stores.storySettingStore, storyId),
    places: getPlacesByStory(stores.placeStore, storyId),
    powers: getPowersByStory(stores.powerStore, storyId),
    powerAppliers: getPowerAppliersByStory(stores.powerApplierStore, storyId),
  };

  return JSON.stringify(exportData);
};

export const importStoryFromJson = async (data, stores, dispatch) => {
  const {
    story,
    chapters = [],
    characters = [],
    items = [],
    storySettings = [],
    places = [],
    events = [],
    eventItems = [],
    eventTitles = [],
    eventRelations = [],
    eventPowers = [],
    powers = [],
    powerAppliers = [],
  } = data;
  const userId = stores.userStore.loggedInUser.id;
  const updatedStory = { ...story, userId };
  await importStory(updatedStory, dispatch);
  await Promise.all(storySettings.map(c => importStorySetting(c, dispatch)));
  await Promise.all(characters.map(c => importCharacter(c, dispatch)));
  await Promise.all(chapters.map(c => importChapter(c, dispatch)));
  await Promise.all(items.map(c => importItem(c, dispatch)));
  await Promise.all(events.map(c => importEvent(c, dispatch)));
  await Promise.all(eventItems.map(c => importEventItem(c, dispatch)));
  await Promise.all(eventTitles.map(c => importEventTitle(c, dispatch)));
  await Promise.all(eventRelations.map(c => importEventRelation(c, dispatch)));
  await Promise.all(eventPowers.map(c => importEventPower(c, dispatch)));
  await Promise.all(places.map(c => importPlace(c, dispatch)));
  await Promise.all(powers.map(c => importPower(c, dispatch)));
  await Promise.all(powerAppliers.map(c => importPowerApplier(c, dispatch)));
};

export const readFileAsync = path => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => {
    resolve(reader.result);
  };

  reader.onerror = reject;

  reader.readAsText(path);
});

export const readFromSource = fileName => new Promise((resolve, reject) => {
  const client = new XMLHttpRequest();
  client.open('GET', `./releaseNotes/${fileName}`, true);
  client.onload = () => {
    resolve(client.response);
  };
  client.onerror = () => {
    reject(client.statusText);
  };
  client.send();
});
