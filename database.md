# database layout

## character layout
```
  {
    _id: '',
    firstName: '',
    lastName: '',
    genderId: '',
    birthYear: 0,
    basicAttributes: [],
    basicCharacteristics: [],
    statusses: [],
    items: [],
    description: '',
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

what are statusses?
  - statusses are an array of statusses given to a character which are inherited from birth.
    - for example: if a character is cursed from birth, this will be recorded in the statusses.

  statusses layout:
  ```
    {
      statusId: '',
      level: 0,
      description: '',
    }
  ```

what are items?
  - items are an array of items given to a character which are inherited from birth.
    - for example: if a character received a necklace from birth, this will be recorded in the items.

  items layout:
  ```
    {
      itemId: '',
      level: 0,
      description: '',
    }
  ```

## Event layout:

```
  {
   _id: '',
    characterId: '',
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
  - events are an array of occurrances in the character history -> link to character _id
  - an event holds a description
  - an event can create / remove attributes => this means it is possible, by event to add or substract values from the basicAttributes. if no value is given, the value 0 is recorded.
  - an event can create / remove characteristics => this means it is possible, by event to add or substract values from the basicCharacteristic. if no value is given, the value 0 is recorded.

### code tables

- the following code tables are provided as an extra resource
  - races
  - genders
  - attributes
  - characteristics
  - items
  - statusses