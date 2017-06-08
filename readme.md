# Writersblock app

## Step 1: get the data right
### character layout
```
  {
    _id: '',
    firstName: '',
    lastName: '',
    genderId: '',
    birthYear: 0,
    basicAttributes: [],
    basicCharacteristics: [],
  }
```

what are basicAttributes?
  - basicAttributes are an array of attributes that are given to a character which are inherited from birth.
    - for example: if a character holds an affinity for a certain attribute, this will be recorded in the attributes.

  basicAttrribute layout:
  ```
  {
    attributeId: '',
    level: 0,
  }
  ```

what are basicCharacterics?
  - basicCharacterics are an array of characteristics given to a character which are inherited from birth.
    - for example: if a character is moody from birth, this will be recorded in the basicCharacteristics.

  basicCharacteristics layout:
  ```
    {
      characteristicId: '',
      level: 0,
    }
  ```

### Event layout:

```
  {
   _id: '',
    year: 0,
    yearCounter: 0,
    description: '',
    attributeId: '',
    attributeNumber: 0,
    characteristicId: '',
    characteristicNumber: 0,
  }
```
What are events?
  - events are an array of occurrances in the character history
  - an event holds a description
  - an event can create / remove attributes => this means it is possible, by event to add or substract values from the basicAttributes. if no value is given, the value 0 is recorded.
  - an event can create / remove characteristics => this means it is possible, by event to add or substract values from the basicCharacteristic. if no value is given, the value 0 is recorded.

### code tables

- the following code tables are provided as an extra resource
  - races
  - genders
  - attributes
  - characteristics

## Create the app
  - create a SPA app in React and use CouchDb to store data locally.

the page should contain the following structure:
  - homepage containing a list of characters or a text
  - an about page with some extra information about the app
  - a character edit page
    - this page consists out of the following components:
      - character basic data sheet
      - character attribute data sheet

## Host the app
  - host the app somewhere for a first testDraft
    - Surge

## Data enhancer
  - The app needs to work with local data. This means old data could be on the localStorage but would be outdated for the new datastructure that is asked.
  - provide a function/pouchDb object to update the values into the newer scheme. This way it is possible to update the old data scheme into the new.

## Make it bigger
  - version 1.0.0 is now available on http://writersblock.surge.sh.

some ideas:
  - stories
  - link characters to a story
  - add chapters to a story
  - create offline / online sync process (with pouchDb / own JSON storage / I DONT KNOW ;-) )
  - create authentication or something like that => Heroku db for that ...
  - create copy sheet of character with events
  - create copy sheet of story with chapters