# Writersblock Stuff to do

## General
A user should be able to create a story.
A story consists out
  - General data
    + Title
    + Synopsis
  - Chapters
    + Sequence
    + Authors description
    + Description
    + Title
    + Chapter
    + written in Markdown
    + List of events
  - Characters
    + Firstname
    + Lastname
    - Birthdate or year
    + Authors description
    + Description
    - List of items
    - List of titles
    - growth functionality
    + List of personal traits
    + List of statistical traits
    + List of events
    + List of relations
  - Items
    + Name
    + ItemType
    + Authors description
    + Description
    - List of titles
    - List of personal traits (exceptionally)
    - List of statistical traits
  - Events
    + Description
    + Authors description
    - statistical trait change
    - personal trait change
    - title gain

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
  - items defined per subtype
  - traits defined per subtype
  - titles defined per subtype
  - power defined per subtype
  - status
  - genders
  - race
  - notes

Story export options:
  - as PDF
  - as md
  - as Ebook / Epub
  + as json (.wbson)

Story import options
  + json (.wbson)

=> A pre-defined list for item, personal and statistical traits will be made by WritersBlock (purely optional for the user to create)