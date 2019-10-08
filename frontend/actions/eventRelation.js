import actionBuilder from './actionBuilder';
import eventRelationDb from '../helpers/pouch/eventRelation';

const actions = actionBuilder(eventRelationDb, 'EventRelation');

export const addEventRelation = async (
  eventRelation, dispatch) => actions.add(eventRelation, dispatch);

export const updateEventRelation = async (
  eventRelation, dispatch) => actions.update(eventRelation, dispatch);

export const importEventRelation = async (
  eventRelation, dispatch) => actions.importData(eventRelation, dispatch);

export const removeEventRelation = async (
  eventRelation, dispatch) => actions.remove(eventRelation, dispatch);

export const getEventRelations = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getEventRelationsByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeEventRelationsFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
