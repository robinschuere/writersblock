# Writersblock Stuff to do

## General
A user should be able to create a story.
A story consists out
  - General data
    + Title
    + Synopsis
    + written in Markdown
    - functionalities
  - Chapters
    + Sequence
    + Authors description
    + Description
    + Title
    + Chapter
    + List of events
  - Characters
    + Firstname
    + Lastname
    - Birthdate or year
    + Authors description
    + Description
    + growth functionality
    + List of events
  - Items
    + Name
    + ItemType
    + Authors description
    + Description
    + title
    + List of statistic traits
    + List of required statistic traits
  - Events
    + Description
    + Authors description
    + personal trait change (list of traits)
    + statistic trait change (list of traits)
    - list with acquired or lost items
    - list with acquired relations
    - list with acquired or lost titles
    - list with acquired or lost powers
  - Places
    + Name
    + Description
    + Authors description
    - List of characters
    - List of main resources
  - Powers
    + Name
    + Description
    + Authors description
    + List of power appliers
      - target (self / other)
      - type (damage / recover)
      - prop (HP / SP / MP / ST / TRAIT)
      - basedOn (trait)
      - calc type ( % / #)
      - amount
      - affectedTrait (only when prop = trait)
    - List of statistic traits
    - List of required statistic traits
  - Nations and Countries
    - Name
    - Description
    - Authors description
    - List of places

## Nations and countries
It should be possible to create a kind of structure in where places are linked to a coordinates based system.

## Login
The app should be user specific. This means that the App holds a minimum security measure for unwilling eyes. (Since the data is stored on the chrome DB, no data will be sent to a remote server)

## User
After login, a user gains access to
  - His profile
  - His stories
  - Logout page

## Story
A user should be able to view a list of his stories and be able to add / update and delete them.
Once a story is selected, a new navigation bar will be available for the user to go back to the story overview since a story consists out of different items.

A user should be able to create certain subTypes for a generic itembase (used per story). This means the user is able to create it's own definitions of:
  + items defined per subtype
  + traits defined per subtype
  + titles defined per subtype
  - power defined per subtype
  + status
  + genders
  + race
  + notes
  + placeType

Story export options:
  - as PDF
  - as md
  - as Ebook / Epub
  + as json (.wbson)

Story import options
  + json (.wbson)

Guide
  - Add a guide so users get a general understanding of how the app works.

=> A pre-defined list for item, personal and statistical traits will be made by WritersBlock (purely optional for the user to create)