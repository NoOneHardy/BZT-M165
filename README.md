# BZT-M165

## Endpoints

* POST '/products' => Erstelltes Objekt
* POST '/prodcuts/{id}' => Bearbeitetes Objekt
* GET '/products' => Array mit allen Objekten
* GET '/products/{id}' => Bestimmtes Objekt
* GET '/search/{query}' => Suche nach Text
* DELETE '/products/{id}' => Löschen eines bestimmten Objekts

## Start Project

### Backend

CouchDB Username und Passwort in ./backend/ConnectDB.py:7-8 setzen.

### Frontend

1. ```cd ./frontend```
2. ```npm install```
3. ```npm run start```
4. http://localhost:4200 im Browser öffnen.
