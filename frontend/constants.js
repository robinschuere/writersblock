/* eslint-disable max-len */
export const constants = {
  userDb: 'writersblock_user_db',
  storyDb: 'writersblock_story_db',
  chapterDb: 'writersblock_chapter_db',
  characterDb: 'writersblock_character_db',
  storySettingsDb: 'writersblock_storysettings_db',
  itemDb: 'writersblock_item_db',
  eventDb: 'writersblock_event_db',
  eventTitleDb: 'writersblock_event_title_db',
  eventPowerDb: 'writersblock_event_power_db',
  eventItemDb: 'writersblock_event_item_db',
  eventRelationDb: 'writersblock_event_relation_db',
  placeDb: 'writersblock_place_db',
  powerDb: 'writersblock_power_db',
  powerApplierDb: 'writersblock_power_applier_db',

  dbVersion: '0.0.1',

  mobileListColumns: 2,

  enableDropper: false,

  releaseNotes: [
    '1.1.0',
    '1.0.0',
  ],

  storyRoutes: {
    characters: 'characters',
    chapters: 'chapters',
    storySettings: 'storySettings',
  },

  actions: {
    setSearch: 'set_search',
    setTabNavigation: 'set_tab_navigation',

    addUser: 'add_user',
    loginUser: 'login_user',
    updateUser: 'update_user',
    logoutUser: 'logout_user',

    addStory: 'add_story',
    updateStory: 'update_story',
    removeStory: 'remove_story',
    setStories: 'set_stories',
    emptyStories: 'empty_stories',

    addChapter: 'add_chapter',
    updateChapter: 'update_chapter',
    removeChapter: 'remove_chapter',
    setChapters: 'set_chapters',
    emptyChapters: 'empty_chapters',
    removeChapters: 'remove_chapters',

    addCharacter: 'add_character',
    updateCharacter: 'update_character',
    removeCharacter: 'remove_character',
    setCharacters: 'set_characters',
    emptyCharacters: 'empty_characters',
    removeCharacters: 'remove_characters',

    addEvent: 'add_event',
    updateEvent: 'update_event',
    removeEvent: 'remove_event',
    setEvents: 'set_events',
    emptyEvents: 'empty_events',
    removeEvents: 'remove_events',

    addEventItem: 'add_event_item',
    updateEventItem: 'update_event_item',
    removeEventItem: 'remove_event_item',
    setEventItems: 'set_event_items',
    emptyEventItems: 'empty_event_items',
    removeEventItems: 'remove_event_items',

    addEventPower: 'add_event_power',
    updateEventPower: 'update_event_power',
    removeEventPower: 'remove_event_power',
    setEventPowers: 'set_event_powers',
    emptyEventPowers: 'empty_event_powers',
    removeEventPowers: 'remove_event_powers',

    addEventRelation: 'add_event_relation',
    updateEventRelation: 'update_event_relation',
    removeEventRelation: 'remove_event_relation',
    setEventRelations: 'set_event_relations',
    emptyEventRelations: 'empty_event_relations',
    removeEventRelations: 'remove_event_relations',

    addEventTitle: 'add_event_title',
    updateEventTitle: 'update_event_title',
    removeEventTitle: 'remove_event_title',
    setEventTitles: 'set_event_titles',
    emptyEventTitles: 'empty_event_titles',
    removeEventTitles: 'remove_event_titles',

    addItem: 'add_item',
    updateItem: 'update_item',
    removeItem: 'remove_item',
    setItems: 'set_items',
    emptyItems: 'empty_items',
    removeItems: 'remove_items',

    addPlace: 'add_place',
    updatePlace: 'update_place',
    removePlace: 'remove_place',
    setPlaces: 'set_places',
    emptyPlaces: 'empty_places',
    removePlaces: 'remove_places',

    addPower: 'add_power',
    updatePower: 'update_power',
    removePower: 'remove_power',
    setPowers: 'set_powers',
    emptyPowers: 'empty_powers',
    removePowers: 'remove_powers',

    addPowerApplier: 'add_power_applier',
    updatePowerApplier: 'update_power_applier',
    removePowerApplier: 'remove_power_applier',
    setPowerAppliers: 'set_power_appliers',
    emptyPowerAppliers: 'empty_power_appliers',
    removePowerAppliers: 'remove_power_appliers',

    addStorySetting: 'add_story_setting',
    updateStorySetting: 'update_story_setting',
    removeStorySetting: 'remove_story_setting',
    setStorySettings: 'set_story_settings',
    emptyStorySettings: 'empty_story_settings',
    removeStorySettings: 'remove_story_settings',
  },

  routesWithoutNavBarOrFooter: [
    '/import',
    '/register',
    '/user',
    '/user/edit',
    '/user/delete',
    '/user/changepassword',
    '/stories/new',
    '/stories/:storyId/edit',
    '/stories/:storyId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventTitles/new',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventTitles/:eventTitleId/edit',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventTitles/:eventTitleId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventTitles/:eventTitleId',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventPowers/new',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventPowers/:eventPowerId/edit',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventPowers/:eventPowerId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventPowers/:eventPowerId',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventItems/new',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventItems/:eventItemId/edit',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventItems/:eventItemId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/eventItems/:eventItemId',
    '/stories/:storyId/:storyRoute/:parentId/events/new',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/edit',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId',
    '/stories/:storyId/places/new',
    '/stories/:storyId/places/:placeId',
    '/stories/:storyId/places/:placeId/edit',
    '/stories/:storyId/places/:placeId/delete',
    '/stories/:storyId/powers/:powerId/powerAppliers/new',
    '/stories/:storyId/powers/:powerId/powerAppliers/:powerApplierId/delete',
    '/stories/:storyId/powers/:powerId/powerAppliers/:powerApplierId/edit',
    '/stories/:storyId/powers/:powerId/powerAppliers/:powerApplierId',
    '/stories/:storyId/powers/new',
    '/stories/:storyId/powers/:powerId',
    '/stories/:storyId/powers/:powerId/edit',
    '/stories/:storyId/powers/:powerId/delete',
    '/stories/:storyId/chapters/new',
    '/stories/:storyId/chapters/:chapterId',
    '/stories/:storyId/chapters/:chapterId/edit',
    '/stories/:storyId/chapters/:chapterId/delete',
    '/stories/:storyId/characters/new',
    '/stories/:storyId/characters/:characterId',
    '/stories/:storyId/characters/:characterId/growth',
    '/stories/:storyId/characters/:characterId/edit',
    '/stories/:storyId/characters/:characterId/delete',
    '/stories/:storyId/items/new',
    '/stories/:storyId/items/:itemId',
    '/stories/:storyId/items/:itemId/edit',
    '/stories/:storyId/items/:itemId/delete',
    '/stories/:storyId/storySettings/new',
    '/stories/:storyId/storySettings/:storySettingId',
    '/stories/:storyId/storySettings/:storySettingId/edit',
    '/stories/:storyId/storySettings/:storySettingId/delete',
  ],

  breadCrumbRoutes: {
    storyOverview: '/stories/:storyId',
    chapterOverview: '/stories/:storyId/chapters',
    characterOverview: '/stories/:storyId/characters',
    storySettingOverview: '/stories/:storyId/storySettings',
    itemOverview: '/stories/:storyId/items',
    placeOverview: '/stories/:storyId/places',
    powerOverview: '/stories/:storyId/powers',
  },

  routesWithStoryBoard: [
    '/stories/:storyId',
    '/stories/:storyId/chapters',
    '/stories/:storyId/storySettings',
    '/stories/:storyId/characters',
    '/stories/:storyId/items',
    '/stories/:storyId/places',
    '/stories/:storyId/powers',
  ],

  locales: {
    nl: 'nl-NL',
    en: 'en-US',
  },

  yesNo: {
    yes: 'yes',
    no: 'no',
  },

  trueFalse: {
    true: 'true',
    false: 'false',
  },

  calcTypes: {
    percentage: 'percentage',
    amount: 'amount',
  },

  statTypes: {
    active: 'active',
    passive: 'passive',
  },

  targetTypes: {
    self: 'self',
    other: 'other',
  },

  damageTypes: {
    damage: 'damage',
    recover: 'recover',
  },

  damagePropTypes: {
    health: 'health',
    stamina: 'stamina',
    skillPoints: 'skillPoints',
    magicPoints: 'magicPoints',
    trait: 'trait',
  },

  eventItemTypes: {
    found: 'found',
    lost: 'lost',
  },

  eventTitleTypes: {
    acquired: 'acquired',
    removed: 'removed',
  },

  eventPowerTypes: {
    learnt: 'learnt',
    forgotten: 'forgotten',
  },

  views: {
    list: 'list',
    radar: 'radar',
  },

  storyStatusses: {
    draft: 'draft',
    completed: 'completed',
    revision: 'revision',
  },

  about: {
    tipsAndTricks: {
      register: ['title', 'one', 'two'],
      story: ['title', 'startStory', 'startChapter', 'authorDescription'],
      events: ['title', 'one', 'two', 'three', 'four'],
      data: ['title', 'one', 'two'],
      markdown: ['title', 'description', 'url'],
    },
  },

  slotIds: {
    cape: 'cape',
    helm: 'helm',
    quiver: 'quiver',
    earringLeft: 'earringLeft',
    neck: 'neck',
    earringRight: 'earringRight',
    handLeft: 'handLeft',
    body: 'body',
    handRight: 'handRight',
    braceletLeft: 'braceletLeft',
    belt: 'belt',
    braceletRight: 'braceletRight',
    glovesLeft: 'glovesLeft',
    legs: 'legs',
    glovesRight: 'glovesRight',
    ringLeft: 'ringLeft',
    boots: 'boots',
    ringRight: 'ringRight',
  },

  slots: {
    helm: { name: 'helm', amount: 1 },
    body: { name: 'body', amount: 1 },
    legs: { name: 'legs', amount: 1 },
    gloves: { name: 'gloves', amount: 2 },
    boots: { name: 'boots', amount: 1 },
    cape: { name: 'cape', amount: 1 },
    hand: { name: 'hand', amount: 2 },
    quiver: { name: 'quiver', amount: 1 },
    earring: { name: 'earring', amount: 2 },
    ring: { name: 'ring', amount: 4, icon: '' },
    bracelet: { name: 'bracelet', amount: 2 },
    neck: { name: 'neck', amount: 1 },
    belt: { name: 'belt', amount: 1 },
  },

  itemSubTypesWithSlots: [
    'wearable',
  ],

  storySetting: {
    types: {
      itemType: {
        subTypes: {
          wearable: 'wearable',
          tool: 'tool',
        },
      },
      trait: {
        subTypes: {
          personal: 'personal',
          statistic: 'statistic',
        },
      },
      title: {
        subTypes: {
          character: 'character',
          item: 'item',
        },
      },
      notes: 'notes',
      race: 'race',
      gender: 'gender',
      status: 'status',
      placeType: 'place',
      resourceType: 'resourceType',
      power: 'power',
      relationType: 'relationType',
    },
  },
};

export const setupSlots = [
  {
    slots: [
      { slotId: constants.slotIds.cape, name: constants.slots.cape.name, transform: false },
      { slotId: constants.slotIds.helm, name: constants.slots.helm.name, transform: false },
      { slotId: constants.slotIds.quiver, name: constants.slots.quiver.name, transform: false },
    ],
  },
  {
    slots: [
      { slotId: constants.slotIds.earringLeft, name: constants.slots.earring.name, transform: true },
      { slotId: constants.slotIds.neck, name: constants.slots.neck.name, transform: false },
      { slotId: constants.slotIds.earringRight, name: constants.slots.earring.name, transform: false },
    ],
  },
  {
    slots: [
      { slotId: constants.slotIds.handLeft, name: constants.slots.hand.name, transform: true },
      { slotId: constants.slotIds.body, name: constants.slots.body.name, transform: false },
      { slotId: constants.slotIds.handRight, name: constants.slots.hand.name, transform: false },
    ],
  },
  {
    slots: [
      { slotId: constants.slotIds.braceletLeft, name: constants.slots.bracelet.name, transform: true },
      { slotId: constants.slotIds.belt, name: constants.slots.belt.name, transform: false },
      { slotId: constants.slotIds.braceletRight, name: constants.slots.bracelet.name, transform: false },
    ],
  },
  {
    slots: [
      { slotId: constants.slotIds.glovesLeft, name: constants.slots.gloves.name, transform: true },
      { slotId: constants.slotIds.legs, name: constants.slots.legs.name, transform: false },
      { slotId: constants.slotIds.glovesRight, name: constants.slots.gloves.name, transform: false },
    ],
  },
  {
    slots: [
      { slotId: constants.slotIds.ringLeft, name: constants.slots.ring.name, transform: true },
      { slotId: constants.slotIds.boots, name: constants.slots.boots.name, transform: false },
      { slotId: constants.slotIds.ringRight, name: constants.slots.ring.name, transform: false },
    ],
  },
];
