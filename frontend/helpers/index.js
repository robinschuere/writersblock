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

export const alphabeticalSort = (a, b) => {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();

  let comparison = 0;
  if (labelA > labelB) {
    comparison = 1;
  } else if (labelA < labelB) {
    comparison = -1;
  }
  return comparison;
};

export const getOptionsFromStorySetting = (
  store, storyId, typeId, i18n, subType,
) => getStorySettingsByStory(store, storyId)
  .filter(f => f.type === typeId && (subType ? f.subType === subType : true))
  .map(f => ({
    id: f.id,
    value: f.id,
    label: f.name,
    longDescription: [f.subType ? i18n.t(`storySetting.types.${typeId}.subTypes.${f.subType}.title`) : '', f.description].filter(x => x).join(': '),
    description: f.description,
  }))
  .sort(alphabeticalSort);

export const getStorySettingOptions = i18n => Object.keys(constants.storySetting.types)
  .map(f => ({
    value: f,
    label: i18n.t(`storySetting.types.${f}.title`),
    description: i18n.t(`storySetting.types.${f}.description`),
  }))
  .sort(alphabeticalSort);

export const getStorySettingOption = (type, i18n) => getStorySettingOptions(i18n)
  .find(f => f.value === type).label;

export const getStorySettingSubTypeOptions = (type, i18n) => {
  if (type) {
    const { subTypes } = constants.storySetting.types[type];
    if (subTypes) {
      return Object.keys(subTypes)
        .map(s => ({
          value: s,
          label: i18n.t(`storySetting.types.${type}.subTypes.${s}.title`),
          description: i18n.t(`storySetting.types.${type}.subTypes.${s}.description`),
        }))
        .sort(alphabeticalSort);
    }
  }
  return undefined;
};

export const getStorySettingSubTypeOption = (type, subType, i18n) => {
  const subTypes = getStorySettingSubTypeOptions(type, i18n);
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
      paths.push({
        ...breadCrumb,
        path,
      });
    }
  });
  return paths.slice(0, paths.length - 1);
};

export const getLanguages = () => Object.keys(constants.locales)
  .map(f => ({
    label: constants.locales[f],
    value: f,
  }))
  .sort(alphabeticalSort);

export const getDefaultStorySettings = (storyId, i18n) => constants.storySetting.defaultSettings
  .map(d => ({
    storyId,
    ...d,
    name: i18n.t(`storySetting.defaultSettings.${d.name}.name`),
    authorDescription: i18n.t('storySetting.defaultSettings.creation'),
    description: i18n.t(`storySetting.defaultSettings.${d.name}.description`),
  }));

export const updateStorySettingList = (array, object) => {
  const index = array.findIndex(a => a.id === object.id);
  if (index > -1) {
    return [
      ...array.slice(0, index),
      object,
      ...array.slice(index + 1),
    ];
  }
  return [...array, object];
};

export const getYesNoOptions = i18n => [
  { value: 'yes', label: i18n.t('generic.yes') },
  { value: 'no', label: i18n.t('generic.no') },
];

export const getStoryStatusOptions = i18n => [
  { value: 'draft', label: i18n.t('generic.storyStatus.draft') },
  { value: 'completed', label: i18n.t('generic.storyStatus.completed') },
  { value: 'revision', label: i18n.t('generic.storyStatus.revision') },
];

export const getTrueFalseOptions = i18n => [
  { value: 'true', label: i18n.t('generic.true') },
  { value: 'false', label: i18n.t('generic.false') },
];

export const isYes = value => value === 'yes';
export const isTrue = value => value === 'true';

export const formatCharacter = characterStore => (characterId) => {
  const character = characterStore[characterId];
  return `${character.firstName} ${character.lastName}`;
};

export const formatChapter = chapterStore => (chapterId) => {
  const chapter = chapterStore[chapterId];
  return chapter ? `${chapter.counter}: ${chapter.title}` : '';
};
