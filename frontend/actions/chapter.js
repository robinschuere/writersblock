import chapterDb from '../helpers/pouch/chapter';
import constants from '../constants';

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

export const addChapter = async (chapter, dispatch) => {
  await updateExistingChaptersCounterForStory(chapter, 1, dispatch);
  const newChapter = await chapterDb.insert(chapter);
  dispatch({
    type: constants.actions.addChapter,
    value: newChapter,
  });
};

export const updateChapter = async (chapter, dispatch) => {
  await updateExistingChaptersCounterForStory(chapter, 1, dispatch);
  const updatedChapter = await chapterDb.update(chapter);
  dispatch({
    type: constants.actions.updateChapter,
    value: updatedChapter,
  });
};

export const removeChapter = async (chapter, dispatch) => {
  await updateExistingChaptersCounterForStory(chapter, -1, dispatch);
  await chapterDb.remove(chapter);
  dispatch({ type: constants.actions.removeChapter, value: chapter });
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
