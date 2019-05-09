export default {
  userDb: 'writersblock_user_db',
  storyDb: 'writersblock_story_db',
  chapterDb: 'writersblock_chapter_db',

  dbVersion: '0.0.1',

  mobileListColumns: 2,

  entityTypes: {
    USER: 'user',
    STORY: 'story',
    CHAPTER: 'chapter',
    CHARACTER: 'character',
    ITEM: 'item',
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
  },
};
