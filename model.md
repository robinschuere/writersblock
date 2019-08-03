# Writersblock Stuff to do

## General
A user should be able to create a story.
A story consists out
  - General data
    - Title
    - Synopsis
  - Chapters
    - Sequence
    - Authors description
    - Title
    - Chapter
    - Occurrence in story time
    - written in Markdown
  - Characters
    - Firstname
    - Lastname
    - Birthdate or year
    - Description
    - List of items
    - List of titles
    - List of personal traits
    - List of statistical traits
    - List of events
  - Items
    - Name
    - ItemType
    - Description
    - Created
    - List of titles
    - List of personal traits (exceptionally)
    - List of statistical traits

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

A user should be able to print out the complete story.
  - PDF / EBook selection
  - Select print size (A4, A5, ...) only on PDF
  - Insert a Cover image (or just the name of the story)
  - Insert a foreword (only if you haven't defined one as a chapter yet)
  - Choose a lettertype for the text (only on PDF)
  - Insert a backword (only if you haven't defined one as a chapter yet)
  - Insert a back Cover (only PDF)
  -

=> A defined list for item, personal and statistical traits will be made as default option.