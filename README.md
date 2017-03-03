# path-to-philosophy
<br />
Wikipedia Getting to Philosophy
<br />
There is an interesting property of Wikipedia where a user can visit a random article, repeatedly follow the first link in the body of the article, and end up on the Wikipedia page on 'Philosophy'. You can read more about this property in this article: https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy
<br />
Objective is to write an API using Node.js that will accept the URL for a random Wikipedia article and return an ordered, JSON encoded array of all the articles visited. This is the "path to philosophy".
<br />
Node v6.9.1 <br />
NPM 3.10.8 <br />
<br />
Dependency: <br />
body-parser 1.15.2 <br />
cheerio 0.22.0 <br />
express 4.14.0 <br />
request 2.78.0 <br />
<br />
Dev Dependency: <br />
chai 3.5.0 <br />
chai-http 3.0.0 <br />
mocha 3.1.2 <br />
<br />
Clone the repo and install the dependencies (npm install) - <br />
Test via: npm test <br />
Run via: npm start <br />
Curl cli call: curl -i -H "Accept: application/json" localhost:8080/path-to-philosophy/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FWikipedia%3AGetting_to_Philosophy  <br />