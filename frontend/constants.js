export default {
  userDb: 'writersblock_user_db',
  storyDb: 'writersblock_story_db',
  chapterDb: 'writersblock_chapter_db',
  characterDb: 'writersblock_character_db',
  storySettingsDb: 'writersblock_storysettings_db',
  itemDb: 'writersblock_item_db',
  eventDb: 'writersblock_event_db',
  relationDb: 'writersblock_relation_db',

  dbVersion: '0.0.1',

  mobileListColumns: 2,

  storyRoutes: {
    characters: 'characters',
    chapters: 'chapters',
    storySettings: 'storySettings',
  },

  actions: {
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

    addRelation: 'add_relation',
    updateRelation: 'update_relation',
    removeRelation: 'remove_relation',
    setRelations: 'set_relations',
    emptyRelations: 'empty_relations',
    removeRelations: 'remove_relations',

    addItem: 'add_item',
    updateItem: 'update_item',
    removeItem: 'remove_item',
    setItems: 'set_items',
    emptyItems: 'empty_items',
    removeItems: 'remove_items',

    addStorySetting: 'add_story_setting',
    updateStorySetting: 'update_story_setting',
    removeStorySetting: 'remove_story_setting',
    setStorySettings: 'set_story_settings',
    emptyStorySettings: 'empty_story_settings',
    removeStorySettings: 'remove_story_settings',
  },

  routesWithoutNavBarOrFooter: [
    '/import',
    '/user/edit',
    '/user/changepassword',
    '/stories/new',
    '/stories/:storyId/edit',
    '/stories/:storyId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/new',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId/delete',
    '/stories/:storyId/:storyRoute/:parentId/events/:eventId',
    '/stories/:storyId/chapters/new',
    '/stories/:storyId/chapters/:chapterId/edit',
    '/stories/:storyId/chapters/:chapterId/delete',
    '/stories/:storyId/characters/new',
    '/stories/:storyId/characters/:characterId/relations/new',
    '/stories/:storyId/characters/:characterId/relations/:relationId',
    '/stories/:storyId/characters/:characterId/relations/:relationId/delete',
    '/stories/:storyId/characters/:characterId/edit',
    '/stories/:storyId/characters/:characterId/delete',
    '/stories/:storyId/items/new',
    '/stories/:storyId/items/:itemId/edit',
    '/stories/:storyId/items/:itemId/delete',
    '/stories/:storyId/storySettings/new',
    '/stories/:storyId/storySettings/:storySettingId/edit',
    '/stories/:storyId/storySettings/:storySettingId/delete',
  ],

  breadCrumbRoutes: {
    storyOverview: '/stories/:storyId',
    chapterOverview: '/stories/:storyId/chapters',
    chapterView: '/stories/:storyId/chapters/:chapterId',
    characterOverview: '/stories/:storyId/characters',
    characterView: '/stories/:storyId/characters/:characterId',
    storySettingOverview: '/stories/:storyId/storySettings',
    storySettingView: '/stories/:storyId/storySettings/:storySettingId',
    itemOverview: '/stories/:storyId/items',
    itemView: '/stories/:storyId/items/:itemId',
  },

  routesWithStoryBoard: [
    '/stories/:storyId',
    '/stories/:storyId/chapters',
    '/stories/:storyId/chapters/:chapterId',
    '/stories/:storyId/storySettings',
    '/stories/:storyId/storySettings/:storySettingId',
    '/stories/:storyId/characters',
    '/stories/:storyId/characters/:characterId',
    '/stories/:storyId/items',
    '/stories/:storyId/items/:itemId',
  ],

  locales: {
    nl: 'nl-NL',
    en: 'en-US',
  },

  about: {
    tipsAndTricks: {
      register: ['title', 'one', 'two'],
      story: ['title', 'startStory', 'startChapter', 'authorDescription'],
      events: ['title', 'one', 'two', 'three', 'four'],
      relations: ['title', 'description'],
      data: ['title', 'one', 'two'],
      markdown: ['title', 'description', 'url'],
    },
  },

  storySetting: {
    types: {
      item: {
        subTypes: {
          clothing: 'clothing',
          armor: 'armor',
          weapon: 'weapon',
          trinket: 'trinket',
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
          artisan: 'artisan',
          heroic: 'heroic',
          malicious: 'malicious',
        },
      },
      notes: 'notes',
      race: 'race',
      gender: 'gender',
      status: 'status',
      power: {
        subTypes: {
          innate: 'innate',
          slumbering: 'slumbering',
          taught: 'taught',
        },
      },
    },
    defaultSettings: [
      {
        name: 'human',
        type: 'race',
      },
      {
        name: 'elf',
        type: 'race',
      },
      {
        name: 'dwarf',
        type: 'race',
      },
      {
        name: 'centaur',
        type: 'race',
      },
      {
        name: 'orc',
        type: 'race',
      },
      {
        name: 'troll',
        type: 'race',
      },
      {
        name: 'demon',
        type: 'race',
      },
      {
        name: 'male',
        type: 'gender',
      },
      {
        name: 'female',
        type: 'gender',
      },
      {
        name: 'sword',
        type: 'item',
        subType: 'weapon',
      },
      {
        name: 'staff',
        type: 'item',
        subType: 'weapon',
      },
      {
        name: 'bow',
        type: 'item',
        subType: 'weapon',
      },
      {
        name: 'dagger',
        type: 'item',
        subType: 'weapon',
      },
      {
        name: 'crossbow',
        type: 'item',
        subType: 'weapon',
      },
      {
        name: 'wand',
        type: 'item',
        subType: 'weapon',
      },
      {
        name: 'cloak',
        type: 'item',
        subType: 'clothing',
      },
      {
        name: 'hat',
        type: 'item',
        subType: 'clothing',
      },
      {
        name: 'gloves',
        type: 'item',
        subType: 'clothing',
      },
      {
        name: 'tunic',
        type: 'item',
        subType: 'clothing',
      },
      {
        name: 'shirt',
        type: 'item',
        subType: 'clothing',
      },
      {
        name: 'trousers',
        type: 'item',
        subType: 'clothing',
      },
      {
        name: 'helmet',
        type: 'item',
        subType: 'armor',
      },
      {
        name: 'platebody',
        type: 'item',
        subType: 'armor',
      },
      {
        name: 'platelegs',
        type: 'item',
        subType: 'armor',
      },
      {
        name: 'shield',
        type: 'item',
        subType: 'armor',
      },
      {
        name: 'knife',
        type: 'item',
        subType: 'tool',
      },
      {
        name: 'hammer',
        type: 'item',
        subType: 'tool',
      },
      {
        name: 'necklace',
        type: 'item',
        subType: 'trinket',
      },
      {
        name: 'amulet',
        type: 'item',
        subType: 'trinket',
      },
      {
        name: 'ring',
        type: 'item',
        subType: 'trinket',
      },
      {
        name: 'strength',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'constitution',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'defence',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'dexterity',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'intelligence',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'charisma',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'wisdom',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'willpower',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'perception',
        type: 'trait',
        subType: 'statistic',
      },
      {
        name: 'luck',
        type: 'trait',
        subType: 'statistic',
      },
    ],
  },
};
