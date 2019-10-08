import chapterDb from '../helpers/pouch/chapter';
import { constants } from '../constants';
import { removeEventsFromChapter } from './event';

const updateExistingChaptersCounterForAddedStory = async (chapter, dispatch) => {
  const existingChapters = await chapterDb.getAllByStoryId(chapter.storyId);
  const existingChaptersToUpdate = existingChapters.filter(e => e.counter >= chapter.counter);

  await Promise.all(existingChaptersToUpdate.map(async (e) => {
    e.counter += 1;
    const updatedChapter = await chapterDb.update(e);
    dispatch({
      type: constants.actions.updateChapter,
      value: updatedChapter,
    });
  }));
};

const updateExistingChaptersCounterForStory = async (chapter, originalCounter, dispatch) => {
  const existingChapters = await chapterDb.getAllByStoryId(chapter.storyId);
  const change = originalCounter > chapter.counter ? 1 : -1;
  const bigCounter = originalCounter > chapter.counter ? originalCounter : chapter.counter;
  const smallCounter = originalCounter > chapter.counter ? chapter.counter : originalCounter;

  const existingChaptersToUpdate = existingChapters
    .filter(e => e.id !== chapter.id && e.counter >= smallCounter && e.counter <= bigCounter);

  await Promise.all(existingChaptersToUpdate.map(async (e) => {
    e.counter += change;
    const updatedChapter = await chapterDb.update(e);
    dispatch({
      type: constants.actions.updateChapter,
      value: updatedChapter,
    });
  }));
};

const getCounter = async (storyId) => {
  const chapters = await chapterDb.getAll(storyId);
  return chapters.length > 0 ? Math.max(...chapters.map(c => c.counter)) : 0;
};

export const addChapter = async (chapter, dispatch) => {
  const latestCounter = await getCounter(chapter.storyId);
  const chapterWithCounter = { ...chapter, counter: chapter.counter || latestCounter + 1 };
  if (chapterWithCounter !== latestCounter + 1) {
    await updateExistingChaptersCounterForAddedStory(chapterWithCounter, dispatch);
  }
  const newChapter = await chapterDb.insert(chapterWithCounter);
  dispatch({
    type: constants.actions.addChapter,
    value: newChapter,
  });
};

export const updateChapter = async (chapter, dispatch) => {
  const originalChapter = await chapterDb.getById(chapter.id);
  if (originalChapter.counter !== chapter.counter) {
    await updateExistingChaptersCounterForStory(chapter, originalChapter.counter, dispatch);
  }
  const updatedChapter = await chapterDb.update(chapter);
  dispatch({
    type: constants.actions.updateChapter,
    value: updatedChapter,
  });
};

export const importChapter = async (chapter, dispatch) => {
  const imported = await chapterDb.importData(chapter);
  dispatch({
    type: constants.actions.updateChapter,
    value: imported,
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
    values: chapters,
  });
};
