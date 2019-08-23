import chapter from './chapter';
import story from './story';
import character from './character';
import user from './user';
import place from './place';
import storySetting from './storySetting';
import relation from './relation';
import item from './item';
import event from './event';

export default async () => {
  await user.drop();
  await story.drop();
  await chapter.drop();
  await character.drop();
  await place.drop();
  await item.drop();
  await storySetting.drop();
  await relation.drop();
  await event.drop();
};
