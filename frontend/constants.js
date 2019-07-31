export default {
  userDb: 'writersblock_user_db',
  storyDb: 'writersblock_story_db',
  chapterDb: 'writersblock_chapter_db',
  characterDb: 'writersblock_character_db',
  storySettingsDb: 'writersblock_storysettings_db',
  itemDb: 'writersblock_item_db',

  dbVersion: '0.0.1',

  mobileListColumns: 2,

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
    '/user/edit',
    '/user/changepassword',
    '/stories/new',
    '/stories/:storyId/edit',
    '/stories/:storyId/delete',
    '/stories/:storyId/chapters/new',
    '/stories/:storyId/chapters/:chapterId/edit',
    '/stories/:storyId/chapters/:chapterId/delete',
    '/stories/:storyId/characters/new',
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

  storySetting: {
    types: {
      item: {
        value: 'item',
        label: 'Item',
        subTypes: [
          { value: 'clothing', label: 'clothing', description: 'These are items worn by somebody' },
          { value: 'weapon', label: 'weapon', description: 'These are items used as a weapon' },
          { value: 'trinket', label: 'trinket', description: 'These are items that are worn as an accessory.' },
          { value: 'tool', label: 'tool', description: 'These are items for general use.' },
        ],
      },
      trait: {
        value: 'trait',
        label: 'Trait',
        subTypes: [
          { value: 'personal', label: 'Personal traits', description: 'These are traits that a character holds from birth and change due to character growth.' },
          { value: 'statistic', label: 'Statistic traits', description: 'These are traits that can be placed on a character and an item' },
        ],
      },
      title: {
        value: 'title',
        label: 'Title',
        subTypes: [
          { value: 'artisan', label: 'Artisan', description: 'A title meant for artisan use. For example: Master blacksmith.' },
          { value: 'heroic', label: 'Heroic', description: 'A title meant for heroic use. For example: Knight of the round table.' },
          { value: 'malicious', label: 'Malicious', description: 'A title meant for malicious use. For example: Demon warlord.' },
          { value: 'tool', label: 'Tool', description: 'A title meant for items. For example: Bane equipment.' },
        ],
      },
      race: {
        value: 'race',
        label: 'Race',
      },
    },
  },
};
