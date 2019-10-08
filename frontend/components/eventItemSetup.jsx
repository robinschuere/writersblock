
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { setupSlots } from '../constants';
import Select from './generic/select';
import {
  alphabeticalSort, calculateSetupTraits,
  checkSetupItemsByRequirement, calculateItems, calculateTraits, isYes,
} from '../helpers';
import StorySettingListSelect from './storySettingListSelect';
import LabelAndText from './generic/labelAndText';

const EventItemSetup = (props) => {
  const {
    mobile, eventItemStore, event, itemStore, onChange,
    storyId, eventStore, i18n, eventPowerStore, powerStore,
  } = props;
  if (!event || !event.id) {
    return null;
  }

  const items = calculateItems(eventItemStore, eventStore, event.characterId, event.id);
  const wornUniqueItems = [];
  Object.values(event.setup).forEach((i) => {
    if (i) {
      const item = itemStore[i];
      if (isYes(item.unique)) {
        wornUniqueItems.push(i);
      }
    }
  });
  const existingTraits = calculateTraits(eventStore, event.characterId, event.id, 'statisticTraits');
  const itemsToWear = checkSetupItemsByRequirement(itemStore, items, 'itemId', 'statisticRequiredTraits', existingTraits);
  const {
    traits,
    traitTotal,
    powerTotal,
    setupTotal,
  } = calculateSetupTraits({
    eventStore,
    eventPowerStore,
    itemStore,
    powerStore,
    characterId: event.characterId,
    eventId: event.id,
  });

  const handleChange = slotId => value => onChange(slotId, value);

  const renderImage = slot => (
    <img
      src={`./svg/${slot.name}.svg`}
      alt={slot.name}
      height={mobile ? '75px' : '150px'}
      width={mobile ? '75px' : '150px'}
      style={{ transform: slot.transform ? 'scaleX(-1)' : '' }}
    />
  );

  const renderSelect = (slot) => {
    const existingItemIds = itemsToWear.map(i => i.itemId);
    const options = [];
    Object.keys(itemStore)
      .forEach((key) => {
        if (!wornUniqueItems.includes(key) && existingItemIds.includes(key)) {
          const item = itemStore[key];
          if (!item.slotId || item.slotId === slot.name) {
            options.push({
              value: key,
              label: item.name,
            });
          }
        }
      });

    const handleOnChange = handleChange(slot.slotId);
    return (
      <Select
        value={event.setup[slot.slotId]}
        options={options.sort(alphabeticalSort)}
        onChange={handleOnChange}
      />
    );
  };
  const renderMobileSlots = slots => slots.map(slot => (
    <div className="row" style={{ marginBottom: '2px' }}>
      <div className="col-6">
        {renderImage(slot)}
      </div>
      <div className="col-6">
        {renderSelect(slot)}
      </div>
    </div>
  ));

  const renderDesktopSlots = slots => (
    <div className="row" style={{ marginBottom: '2px' }}>
      {slots.map(slot => (
        <div className="col-4">
          {renderImage(slot)}
          {renderSelect(slot)}
        </div>
      ))}
    </div>
  );
  return (
    <Fragment>
      <LabelAndText type="number" name="radar" label={i18n.t('slot.slotTotal')} value={setupTotal} />
      <div className="container">

        {setupSlots.map(s => (mobile ? renderMobileSlots(s.slots) : renderDesktopSlots(s.slots)))}
        <LabelAndText type="number" name="powerradar" label={i18n.t('slot.powerTotal')} value={powerTotal} />
        <LabelAndText type="number" name="traitradar" label={i18n.t('slot.traitTotal')} value={traitTotal} />
        <StorySettingListSelect {...props} readOnly storyId={storyId} parent="character" type="trait" subType="statistic" values={traits} />

      </div>
    </Fragment>
  );
};

EventItemSetup.propTypes = {
  mobile: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  event: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventItemStore: PropTypes.object.isRequired,
  eventPowerStore: PropTypes.object.isRequired,
  powerStore: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  storyId: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default EventItemSetup;
