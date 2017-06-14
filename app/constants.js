import moment from 'moment';
import first from 'random-firstname';
import last from 'random-lastname';

export const ADD_CHARACTER = 'ADD_CHARACTER';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
export const SAVE_CHARACTER = 'SAVE_CHARACTER';
export const GET_CHARACTERS = 'GET_CHARACTERS';

export const LOGIN_USER = 'LOGIN_USER';

export const dataModel = '1.0.3';

export const newCharacterBasicAttribute = (attributeId, value) => {
  return {
    attributeId: attributeId,
    level: value ? parseInt(value, 10) : 0,
  }
}

export const newCharacter = () => {
  return {
    _id: moment().toISOString(),
    firstName: first(),
    lastName: last(),
    genderId: 0,
    raceId: 0,
    birthYear: 0,
    basicAttributes: [],
    basicCharacteristics: [],
    lastUpdated: moment(),
    description: '',
    dataModel: dataModel,
    userId: '',
  }
}

export const newUser = () => {
  return {
    _id: moment().toISOString(),
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dataModel: dataModel,
  }
}

export const newEvent = (characterId) => {
  return {
    _id: moment().toISOString(),
    characterId: characterId,
    year: 0,
    eventCounter: 0,
    description: '',
    attributes: [],
    characteristics: [],
    lastUpdated: moment(),
    dataModel: dataModel,
  }
}

export const genderList = [
  { id: 0, name: 'Unknown' },
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
];

export const raceList = [
  { id: 0, name: 'Unknown' },
  { id: 1, name: 'Human' },
  { id: 2, name: 'Elf' },
  { id: 3, name: 'Dwarf' },
  { id: 4, name: 'Orc' },
  { id: 5, name: 'Unknown' },
]

export const attributeList = [
  { id: 1, name: 'Strength', description: 'A measure of how physically strong a character is. Strength often controls the maximum weight the character can carry, melee attack and/or damage, and sometimes hit points. Armor and weapons might also have a Strength requirement.' },
  { id: 2, name: 'Constitution', description: 'A measure of how sturdy a character is. Constitution often influences hit points, resistances for special types of damage (poisons, illness, heat etc.) and fatigue.' },
  { id: 3, name: 'Defense', description: 'A measure of how resilient a character is. Defence usually decreases taken damage by either a percentage or a fixed amount per hit. Occasionally combined with Constitution.' },
  { id: 4, name: 'Dexterity', description: 'A measure of how agile a character is. Dexterity controls attack and movement speed and accuracy, as well as evading an opponent\'s attack' },
  { id: 5, name: 'Intelligence', description: 'A measure of a character\'s problem-solving ability. Intelligence often controls a character\'s ability to comprehend foreign languages and their skill in magic. In some cases, intelligence controls how many skill points the character gets at "level up". In some games, it controls the rate at which experience points are earned, or the amount needed to level up. Under certain circumstances, this skill can also negate combat actions between players and NPC enemies. This is sometimes combined with wisdom and/or willpower.' },
  { id: 6, name: 'Charisma', description: 'A measure of a character\'s social skills, and sometimes their physical appearance.' },
  { id: 7, name: 'Wisdom', description: 'A measure of a character\'s common sense and/or spirituality. Wisdom often controls a character\'s ability to cast certain spells, communicate to mystical entities, or discern other character\'s motives or feelings.' },
  { id: 8, name: 'Willpower', description: 'A measure of the character\'s mental resistance (against pain, fear etc.) when falling victim to mind-altering magic, torture, or insanity. Can be combined with wisdom.' },
  { id: 9, name: 'Perception', description: 'A measure of a character\'s openness to their surroundings. Perception controls the chance to detect vital clues, traps or hiding enemies, and might influence combat sequence or the accuracy of ranged attacks. Sometimes combined with wisdom.' },
  { id: 10, name: 'Luck', description: 'A measure of a character\'s luck. Luck might influence anything, but mostly random items, encounters and outstanding successes/failures (such as critical hits).' }
];

export const characteristicList = [
  { id: 1, name: 'Alertness', description: 'Being aware of what is taking place around me so I can have the right responses.' },
  { id: 2, name: 'Attentiveness', description: 'Showing the worth of a person or task by giving my undivided concentration.' },
  { id: 3, name: 'Availability', description: 'Making my own schedule and priorities secondary to the wishes of those I serve.' },
  { id: 4, name: 'Benevolence', description: 'Giving to others basic needs without having as my motive personal reward.' },
  { id: 5, name: 'Boldness', description: 'Confidence that what I have to say or do is true, right, and just.' },
  { id: 6, name: 'Cautiousness', description: 'Knowing how important right timing is in accomplishing right actions.' },
  { id: 7, name: 'Compassion', description: 'Investing whatever is necessary to heal the hurts of others.' },
  { id: 8, name: 'Contentment', description: 'Realizing that true happiness does not depend on material conditions.' },
  { id: 9, name: 'Creativity', description: 'Approaching a need, a task, or an idea from a new perspective.' },
  { id: 10, name: 'Decisiveness', description: 'The ability to recognize key factors and finalize difficult decisions.' },
  { id: 11, name: 'Deference', description: 'Limiting my freedom so I do not offend the tastes of those around me.' },
  { id: 12, name: 'Dependability', description: 'Fulfilling what I consented to do, even if it means unexpected sacrifice.' },
  { id: 13, name: 'Determination', description: 'Purposing to accomplish right goals at the right time, regardless of the opposition.' },
  { id: 14, name: 'Diligence', description: 'Investing my time and energy to complete each task assigned to me.' },
  { id: 15, name: 'Discernment', description: 'Understanding the deeper reasons why things happen.' },
  { id: 16, name: 'Discretion', description: 'Recognizing and avoiding words, actions, and attitudes that could bring undesirable consequences.' },
  { id: 17, name: 'Endurance', description: 'The inward strength to withstand stress and do my best.' },
  { id: 18, name: 'Enthusiasm', description: 'Expressing joy in each task as I give it my best effort.' },
  { id: 19, name: 'Faith', description: 'Confidence that actions rooted in good character will yield the best outcome, even when I cannot see how.' },
  { id: 20, name: 'Flexibility', description: 'Willingness to change plans or ideas according to the direction of my authorities.' },
  { id: 21, name: 'Forgiveness', description: 'Clearing the record of those who have wronged me and not holding a grudge.' },
  { id: 22, name: 'Generosity', description: 'Carefully managing my resources so I can freely give to those in need.' },
  { id: 23, name: 'Gentleness', description: 'Showing consideration and personal concern for others.' },
  { id: 24, name: 'Gratefulness', description: 'Letting others know by my words and actions how they have benefitted my life.' },
  { id: 25, name: 'Honor', description: 'Respecting those in leadership because of the highter authorities they represent.' },
  { id: 26, name: 'Hospitality', description: 'Cheerfully sharing food, shelter, or conversation to benefit others.' },
  { id: 27, name: 'Humility', description: 'Acknowledging that achievement results from the investment of others in my life.' },
  { id: 28, name: 'Initiative', description: 'Recognizing and doing what needs to be done before I am asked to do it.' },
  { id: 29, name: 'Joyfulness', description: 'Maintaining a good attitude, even when faced with unpleasant conditions.' },
  { id: 30, name: 'Justice', description: 'Taking personal responsibility to uphold what is pure, right, and true.' },
  { id: 31, name: 'Loyalty', description: 'Using difficult times to demonstrate my commitment to those I serve.' },
  { id: 32, name: 'Meekness', description: 'Yielding my personal rights and expectations with a desire to serve.' },
  { id: 33, name: 'Obedience', description: 'Quickly and cheerfully carrying out the direction of those who are responsible for me.' },
  { id: 34, name: 'Orderliness', description: 'Arranging myself and my surroundings to achieve greater efficiency.' },
  { id: 35, name: 'Patience', description: 'Accepting a difficult situation without giving a deadline to remove it.' },
  { id: 36, name: 'Persuasiveness', description: 'Guiding vital truths around another’s mental roadblocks.' },
  { id: 37, name: 'Punctuality', description: 'Showing esteem for others by doing the right thing at the right time.' },
  { id: 38, name: 'Resourcefulness', description: 'Finding practical uses for that which others would overlook or discard.' },
  { id: 39, name: 'Responsibility', description: 'Knowing and doing what is expected of me.' },
  { id: 40, name: 'Security', description: 'Structuring my life around that which cannot be destroyed or taken away.' },
  { id: 41, name: 'Self', description: 'ntrol – Rejecting wrong desires and doing what is right.' },
  { id: 42, name: 'Sensitivity', description: 'Perceiving the true attitudes and emotions of those around me.' },
  { id: 43, name: 'Sincerity', description: 'Eagerness to do what is right with transparent motives.' },
  { id: 44, name: 'Thoroughness', description: 'Knowing what factors will diminish the effectiveness of my work or words if neglected.' },
  { id: 45, name: 'Thriftiness', description: 'Allowing myself and others to spend only what is necessary.' },
  { id: 46, name: 'Tolerance', description: 'Realizing that everyone is at varying levels of character development.' },
  { id: 47, name: 'Truthfulness', description: 'Earning future trust by accurately reporting past facts.' },
  { id: 48, name: 'Virtue', description: 'The moral excellen ce evident in my life as I consistently do what is right.' },
  { id: 49, name: 'Wisdom', description: 'Seeing and responding to life situations from a perspective that transcends my current circumstances.' },
];

export function getGenderById(id) {
  return genderList.find((r) => { return r.id === id });
}
export function getAttributeById(id) {
  return attributeList.find((r) => { return r.id === id });
}
export function getCharacteristicById(id) {
  return characteristicList.find((r) => { return r.id === id });
}
export function getRaceById(id) {
  return raceList.find((r) => { return r.id === id });
}

export const getInfo = [
  { date: moment('20170613'), description: 'Added Contact page, changed some bundler values.' },
  { date: moment('20170612'), description: 'Navigation and footer rework. Going to the default of Bootstrap :-)' },
  { date: moment('20170611'), description: 'Added the home page and did some code cleaning. Gotta keep it going.' }
]
