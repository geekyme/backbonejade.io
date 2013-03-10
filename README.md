# BackboneJade.io
---
## A demo implementation of Backbone.js powered by Node.js, Express, Jade, Backbone.io
---
#### What does this do?
* Use of Jade to render initial HTML, and bootstrap a list of users (from dummy server DB :p) into backbone
* How socket.io is used on backbone.js, using Backbone.io
* CRUD on a list of users

#### Instructions
* npm install
* node app.js
* Next fire up a few browsers and go to http://localhost:8080
* Click one of the names and see what happens to the other browsers!
* Try creating a new user / deleting them and see what happens to the other browsers too! The name changing effect also applies to newly added users
* Refresh your browsers to see if data persists
* Feel free to hack on this more to see what else you can do with socket.io + backbone

#### Misc
* package.json list a number of node packages many of which are not necessary but are just hot favourites, simply adding them for convenience