import constants from '../constants';
import {
  getStorySettingsByStory,
} from '../reducers/storySetting';

const pad = value => ((value < 10) ? `0${value}` : value);

export const isMobile = () => window.innerWidth <= 768;

export const getExtraMargins = () => (isMobile() ? '25px' : '75px');

export const buildOptionList = list => list.map(item => ({
  value: item.id,
  label: item.name,
}));

export const formatDate = (date) => {
  if (date) {
    const value = new Date(date);
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();
    return `${pad(day)}/${pad(month)}/${year}`;
  }
  return '';
};

export const formatAmount = (list = []) => list.length;

export const getOptionsFromStorySetting = (
  store, storyId, typeId,
) => getStorySettingsByStory(store, storyId).filter(f => f.type === typeId).map(f => ({
  value: f.id,
  label: f.name,
}));

export const getStorySettingOptions = () => Object.keys(constants.storySetting.types)
  .map(f => constants.storySetting.types[f]);

export const getStorySettingOption = type => getStorySettingOptions()
  .find(f => f.value === type).label;

export const getStorySettingSubTypeOptions = (type) => {
  if (type) {
    return constants.storySetting.types[type].subTypes;
  }
  return undefined;
};

export const getStorySettingSubTypeOption = (type, subType) => {
  const subTypes = getStorySettingSubTypeOptions(type);
  if (subTypes) {
    return subTypes.find(f => f.value === subType).label;
  }
  return undefined;
};

export const getBreadCrumbRoutes = () => Object.keys(constants.breadCrumbRoutes)
  .map(f => ({
    route: constants.breadCrumbRoutes[f],
    name: f,
  }));

export const getBreadCrumbPaths = (computedMatch) => {
  const breadCrumbRoutes = getBreadCrumbRoutes();
  const pathValues = computedMatch.path.split('/');
  const paths = [];
  pathValues.forEach((p, i) => {
    let path = pathValues.slice(0, i + 1).join('/');
    const breadCrumb = breadCrumbRoutes.find(f => f.route === path);
    if (breadCrumb) {
      Object.keys(computedMatch.params)
        .forEach((key) => {
          path = path.replace(`:${key}`, computedMatch.params[key]);
        });
      paths.push({ ...breadCrumb, path });
    }
  });
  return paths.slice(0, paths.length - 1);
};

export const getLanguages = () => Object.keys(constants.locales).map(f => ({
  label: constants.locales[f],
  value: f,
}));
