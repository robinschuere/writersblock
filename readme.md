# Writersblock app

To run the app:
  -`npm i`
  -`npm start`

## database information

[database](./database.md)


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
  - add a cover to a story
  - create offline / online sync process (with pouchDb / own JSON storage / I DONT KNOW ;-) )
  - create authentication or something like that => Heroku db for that ...
  - create export to pdf / ebook
    - for a character with it's attributes, characteristics and events
    - for a complete story
      - cover
      - foreword (optional)
      - table of contents
      - the story
      - afterword (optional)
      - list of characters and their description.
  - create a detail page whereas the user can see the values and different pages for the update of this values.