import chapterDb from '../helpers/pouch/chapter';
import constants from '../constants';
import { removeEventsFromChapter } from './event';

const updateExistingChaptersCounterForStory = async (chapter, amount, dispatch) => {
  const existingChapters = await chapterDb.getAll(chapter.storyId);
  const chaptersToUpdate = existingChapters
    .filter(f => f.id !== chapter.id && f.counter >= chapter.counter)
    .map(f => ({ ...f, counter: f.counter + amount }));
  await Promise.all(chaptersToUpdate.map(u => chapterDb.update(u)));
  dispatch({
    type: constants.actions.setChapters,
    value: chaptersToUpdate,
  });
};

const getCounter = async (storyId) => {
  const chapters = await chapterDb.getAll(storyId);
  return chapters.length > 0 ? Math.max(...chapters.map(c => c.counter)) : 0;
};

export const addChapter = async (chapter, dispatch) => {
  const latestCounter = await getCounter(chapter.storyId);
  const chapterWithCounter = { ...chapter, counter: chapter.counter || latestCounter + 1 };
  await updateExistingChaptersCounterForStory(chapterWithCounter, 1, dispatch);
  const newChapter = await chapterDb.insert(chapterWithCounter);
  dispatch({
    type: constants.actions.addChapter,
    value: newChapter,
  });
};

export const updateChapter = async (chapter, dispatch) => {
  const latestCounter = await getCounter(chapter.storyId);
  const chapterWithCounter = { ...chapter, counter: chapter.counter || latestCounter + 1 };
  await updateExistingChaptersCounterForStory(chapterWithCounter, 1, dispatch);
  const updatedChapter = await chapterDb.update(chapterWithCounter);
  dispatch({
    type: constants.actions.updateChapter,
    value: updatedChapter,
  });
};

export const removeChapter = async (chapter, dispatch) => {
  await updateExistingChaptersCounterForStory(chapter, -1, dispatch);
  await chapterDb.remove(chapter);
  dispatch({ type: constants.actions.removeChapter, value: chapter });
  await removeEventsFromChapter(chapter.id, dispatch);
};

export const getChapters = async (storyId, dispatch) => {
  const chapters = await chapterDb.getAll(storyId);
  dispatch({
    type: constants.actions.setChapters,
    value: chapters,
  });
};

export const getChaptersByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getChapters(s.id, dispatch)));
};

export const removeChaptersFromStory = async (storyId, dispatch) => {
  const chapters = await chapterDb.getAll(storyId);
  await Promise.all(chapters.map(c => chapterDb.remove(c)));
  dispatch({
    type: constants.actions.removeChapters,
    value: chapters,
  });
};
