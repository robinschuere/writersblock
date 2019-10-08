import { useState } from 'react';

import { constants } from '../constants';
import {
  getStorySettingsByStory,
} from '../reducers/storySetting';
import { getEventsByCharacter } from '../reducers/event';
import { getEventItemsByEvent } from '../reducers/eventItem';
import { getEventPowersByEvent } from '../reducers/eventPower';
import { getEventRelationsByEvent } from '../reducers/eventRelation';

export const useField = (initialValue = {}) => {
  const [value, setValue] = useState(initialValue);

  const setValueField = fieldName => (newValue) => {
    const valueToUpdate = { ...value };
    valueToUpdate[fieldName] = newValue;
    setValue(valueToUpdate);
  };

  const setValueFieldProps = (fieldName, onblur = false) => ({
    onChange: !onblur ? setValueField(fieldName) : undefined,
    onBlur: onblur ? setValueField(fieldName) : undefined,
    value: value[fieldName],
  });

  return [value, setValueFieldProps, setValueField];
};

const pad = value => ((value < 10) ? `0${value}` : value);

export const isMobile = () => window.innerWidth <= 768;

export const getExtraMargins = () => (isMobile() ? '25px' : '75px');

export const getYesNoOptions = i18n => [
  { value: constants.yesNo.yes, label: i18n.t('generic.yes') },
  { value: constants.yesNo.no, label: i18n.t('generic.no') },
];

export const getViewOptions = i18n => [
  { value: constants.views.list, label: i18n.t('generic.list') },
  { value: constants.views.radar, label: i18n.t('generic.radar') },
];

export const getStoryStatusOptions = i18n => [
  { value: constants.storyStatusses.draft, label: i18n.t('generic.storyStatus.draft') },
  { value: constants.storyStatusses.completed, label: i18n.t('generic.storyStatus.completed') },
  { value: constants.storyStatusses.revision, label: i18n.t('generic.storyStatus.revision') },
];

export const getSlotOptions = i18n => Object.keys(constants.slots).map(key => ({
  value: key,
  label: i18n.t(`slot.${key}`),
  svg: key,
}));

export const getTrueFalseOptions = i18n => [
  { value: constants.trueFalse.true, label: i18n.t('generic.true') },
  { value: constants.trueFalse.false, label: i18n.t('generic.false') },
];

export const getEventItemTypeOptions = i18n => [
  { value: constants.eventItemTypes.found, label: i18n.t('generic.found') },
  { value: constants.eventItemTypes.lost, label: i18n.t('generic.lost') },
];

export const getEventPowerTypeOptions = i18n => [
  { value: constants.eventPowerTypes.learnt, label: i18n.t('generic.learnt') },
  { value: constants.eventPowerTypes.forgotten, label: i18n.t('generic.forgotten') },
];

export const getEventTitleTypeOptions = i18n => [
  { value: constants.eventTitleTypes.acquired, label: i18n.t('generic.acquired') },
  { value: constants.eventTitleTypes.removed, label: i18n.t('generic.removed') },
];

export const getCalcTypes = i18n => [
  { value: constants.calcTypes.percentage, label: i18n.t('generic.percentage') },
  { value: constants.calcTypes.amount, label: i18n.t('generic.amount') },
];

export const getStatTypes = i18n => [
  { value: constants.statTypes.active, label: i18n.t('generic.active') },
  { value: constants.statTypes.passive, label: i18n.t('generic.passive') },
];

export const getTargetTypes = i18n => [
  { value: constants.targetTypes.self, label: i18n.t('generic.self') },
  { value: constants.targetTypes.other, label: i18n.t('generic.other') },
];

export const getDamageTypes = i18n => [
  { value: constants.damageTypes.damage, label: i18n.t('generic.damage') },
  { value: constants.damageTypes.recover, label: i18n.t('generic.recover') },
];

export const getDamagePropTypes = i18n => [
  { value: constants.damagePropTypes.health, label: i18n.t('generic.health') },
  { value: constants.damagePropTypes.stamina, label: i18n.t('generic.stamina') },
  { value: constants.damagePropTypes.skillPoints, label: i18n.t('generic.skillPoints') },
  { value: constants.damagePropTypes.magicPoints, label: i18n.t('generic.magicPoints') },
  { value: constants.damagePropTypes.trait, label: i18n.t('generic.trait') },
];

export const isYes = value => value === constants.yesNo.yes;
export const isTrue = value => value === constants.trueFalse.true;

export const buildOptionList = list => list.map(item => ({
  value: item.id,
  label: item.name,
}));

export const formatYesNo = (yesNo, i18n) => {
  if (yesNo && isYes(yesNo)) {
    return i18n.t('generic.yes');
  }
  return i18n.t('generic.no');
};

export const formatGenericValueTypes = (value, i18n) => (value ? i18n.t(`generic.${value}`) : '');

export const formatTraitOptions = options => value => (value ? options.find(v => v.value === value).label : '');

export const formatSlotId = (slotId, i18n) => {
  if (slotId) {
    return i18n.t(`slot.${slotId}`);
  }
  return ' - ';
};

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

export const formatTraitLevels = (list = []) => {
  let value = 0;
  list.forEach((f) => { value += f.level; });
  return value;
};

export const counterSort = (a, b) => a.counter - b.counter;

export const sort = fieldName => (a, b) => {
  const labelA = a[fieldName] ? a[fieldName].toUpperCase() : '';
  const labelB = b[fieldName] ? b[fieldName].toUpperCase() : '';

  let comparison = 0;
  if (labelA > labelB) {
    comparison = 1;
  } else if (labelA < labelB) {
    comparison = -1;
  }
  return comparison;
};

export const alphabeticalSort = sort('label');
export const alphabeticalSortOnField = fieldName => sort(fieldName);

const toArray = (value) => {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value : [value];
};

export const getOptionsFromStorySetting = (
  store, storyId, typeId, i18n, subType, withAuthorDescription,
) => {
  const subTypes = toArray(subType);
  return getStorySettingsByStory(store, storyId)
    .filter(f => f.type === typeId && (subTypes ? subTypes.includes(f.subType) : true))
    .map(f => ({
      id: f.id,
      value: f.id,
      label: f.name,
      longDescription: [f.subType ? i18n.t(`storySetting.types.${typeId}.subTypes.${f.subType}.title`) : '', f.description].filter(x => x).join(': '),
      description: f.description,
      authorDescription: isYes(withAuthorDescription) ? f.authorDescription : undefined,
    }))
    .sort(alphabeticalSort);
};

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
    const existingSubType = subTypes.find(f => f.value === subType);
    return existingSubType ? existingSubType.label : undefined;
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
    value: f,
    label: constants.locales[f],
  }))
  .sort(alphabeticalSort);

export const updateList = (array = [], object, remove = false) => {
  const index = array.findIndex(a => a.id === object.id);
  if (index > -1) {
    if (!remove) {
      return [
        ...array.slice(0, index),
        object,
        ...array.slice(index + 1),
      ];
    }
    return [
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];
  }
  if (!remove) {
    return [...array, object];
  }
  return [...array];
};

export const formatItem = itemStore => (itemId) => {
  const item = itemStore[itemId];
  return item ? item.name : ' - ';
};

export const formatPower = powerStore => (powerId) => {
  const item = powerStore[powerId];
  return item ? item.name : ' - ';
};

export const formatStorySetting = storySettingStore => (storySettingId) => {
  const storySetting = storySettingStore[storySettingId];
  return storySetting ? storySetting.name : ' - ';
};

export const formatCharacter = characterStore => (characterId) => {
  const character = characterStore[characterId];
  return character ? `${character.firstName} ${character.lastName}` : ' - ';
};

export const formatChapter = chapterStore => (chapterId) => {
  const chapter = chapterStore[chapterId];
  return chapter ? `${chapter.counter}: ${chapter.title}` : ' - ';
};

export const checkSetupItemsByRequirement = (
  itemStore, items, itemPropertyField, requiredPropertyField, existingTraits,
) => items
  .filter((i) => {
    const item = itemStore[i[itemPropertyField]];
    const required = item[requiredPropertyField];
    return required.every((r) => {
      const trait = existingTraits.find(e => e.id === r.id);
      return trait && trait.level >= r.level;
    });
  });

export const calculateItems = (eventItemStore, eventStore, characterId, eventId) => {
  let existingValues = [];
  const events = getEventsByCharacter(eventStore, characterId);
  const filteredEvents = events.filter(c => c.counter <= eventStore[eventId].counter);
  filteredEvents.forEach((e) => {
    const eventItems = getEventItemsByEvent(eventItemStore, e.id);
    eventItems.forEach((t) => {
      const index = existingValues.findIndex(f => f.itemId === t.itemId);
      if (t.eventItemType === constants.eventItemTypes.found && index === -1) {
        existingValues.push({ ...t });
      }
      if (t.eventItemType === constants.eventItemTypes.lost && index > -1) {
        existingValues = [
          ...existingValues.slice(0, index),
          ...existingValues.slice(index + 1),
        ];
      }
    });
  });
  return existingValues;
};

export const calculatePowerTraits = (
  eventPowerStore, powerStore, eventStore, characterId, eventId,
) => {
  const calculatedTraits = [];
  if (eventId) {
    const events = getEventsByCharacter(eventStore, characterId);
    const filteredEvents = events.filter(c => c.counter <= eventStore[eventId].counter);
    filteredEvents.forEach((e) => {
      const eventPowers = getEventPowersByEvent(eventPowerStore, e.id);
      eventPowers.forEach((ep) => {
        const power = powerStore[ep.powerId];
        const eventTraits = power.statisticTraits || [];
        eventTraits.forEach((t) => {
          const alreadyExisting = calculatedTraits.find(f => f.id === t.id);
          if (alreadyExisting) {
            alreadyExisting.level += t.level;
          } else {
            calculatedTraits.push({ ...t });
          }
        });
      });
    });
  }
  return calculatedTraits;
};

export const calculatePowers = (eventPowerStore, eventStore, characterId, eventId) => {
  let existingValues = [];
  const events = getEventsByCharacter(eventStore, characterId);
  const filteredEvents = events.filter(c => c.counter <= eventStore[eventId].counter);
  filteredEvents.forEach((e) => {
    const eventPowers = getEventPowersByEvent(eventPowerStore, e.id);
    eventPowers.forEach((t) => {
      const index = existingValues.findIndex(f => f.powerId === t.powerId);
      if (t.eventPowerType === constants.eventPowerTypes.learnt && index === -1) {
        existingValues.push({ ...t });
      }
      if (t.eventPowerType === constants.eventPowerTypes.forgotten && index > -1) {
        existingValues = [
          ...existingValues.slice(0, index),
          ...existingValues.slice(index + 1),
        ];
      }
    });
  });
  return existingValues;
};

export const calculateTitles = (eventTitleStore, eventStore, characterId, eventId) => {
  let existingValues = [];
  const events = getEventsByCharacter(eventStore, characterId);
  const filteredEvents = events.filter(c => c.counter <= eventStore[eventId].counter);
  filteredEvents.forEach((e) => {
    const eventTitles = getEventPowersByEvent(eventTitleStore, e.id);
    eventTitles.forEach((t) => {
      const index = existingValues.findIndex(f => f.storySettingId === t.storySettingId);
      if (t.eventTitleType === constants.eventTitleTypes.acquired && index === -1) {
        existingValues.push({ ...t });
      }
      if (t.eventTitleType === constants.eventTitleTypes.removed && index > -1) {
        existingValues = [
          ...existingValues.slice(0, index),
          ...existingValues.slice(index + 1),
        ];
      }
    });
  });
  return existingValues;
};

export const calculateTraits = (eventStore, characterId, eventId, propertyName) => {
  const calculatedTraits = [];
  if (eventId) {
    const events = getEventsByCharacter(eventStore, characterId);
    const filteredEvents = events.filter(c => c.counter <= eventStore[eventId].counter);
    filteredEvents.forEach((e) => {
      const eventTraits = e[propertyName] || [];
      eventTraits.forEach((t) => {
        const alreadyExisting = calculatedTraits.find(f => f.id === t.id);
        if (alreadyExisting) {
          alreadyExisting.level += t.level;
        } else {
          calculatedTraits.push({ ...t });
        }
      });
    });
  }
  return calculatedTraits;
};

export const calculateRelations = (eventRelationStore, eventStore, characterId, eventId) => {
  const calculatedRelations = [];
  if (eventId) {
    const events = getEventsByCharacter(eventStore, characterId);
    const filteredEvents = events.filter(c => c.counter <= eventStore[eventId].counter);
    filteredEvents.forEach((e) => {
      const eventRelations = getEventRelationsByEvent(eventRelationStore, e.id);
      eventRelations.forEach((t) => {
        const alreadyExisting = calculatedRelations.find(f => f.id === t.id);
        if (alreadyExisting) {
          alreadyExisting.level += t.level;
        } else {
          calculatedRelations.push({ ...t });
        }
      });
    });
  }
  return calculatedRelations;
};

export const calculateSetupTraits = ({
  eventStore, eventPowerStore, itemStore, powerStore, characterId, eventId,
}) => {
  const event = eventStore[eventId];
  if (event) {
    let traitTotal = 0;
    let setupTotal = 0;
    let powerTotal = 0;
    const { setup } = event;
    const items = Object.keys(setup).map(key => ({
      ...itemStore[setup[key]],
    }));
    const existingTraits = calculateTraits(eventStore, characterId, eventId, 'statisticTraits');
    const existingPowerTraits = calculatePowerTraits(
      eventPowerStore, powerStore, eventStore, characterId, eventId,
    );

    const calculatedTraits = JSON.parse(JSON.stringify(existingTraits));
    const addOrCalcTrait = (value) => {
      const alreadyExisting = calculatedTraits.find(f => f.id === value.id);
      if (alreadyExisting) {
        alreadyExisting.level += value.level;
      } else {
        calculatedTraits.push({ ...value });
      }
    };
    existingTraits.forEach((f) => { traitTotal += f.level; });
    existingPowerTraits.forEach((f) => { powerTotal += f.level; });
    items.forEach((e) => {
      const values = e.statisticTraits || [];
      values.forEach((t) => {
        setupTotal += t.level;
        addOrCalcTrait(t);
      });
    });
    return {
      traits: calculatedTraits,
      traitTotal,
      powerTotal,
      setupTotal,
    };
  }
  return {
    traits: [],
    traitTotal: 0,
    powerTotal: 0,
    setupTotal: 0,
  };
};
