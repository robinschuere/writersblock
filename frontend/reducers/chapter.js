import reducerBuilder from './reducerBuilder';
import { counterSort } from '../helpers';

const reducer = reducerBuilder('Chapter');

export default reducer;

export const getChaptersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId)
  .sort(counterSort);
