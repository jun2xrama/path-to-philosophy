"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');

const port = 8080;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const wikiIteration = function iterateWiki(url, callback, arr = []) {
    const matchLinkText = /^([a-z\-:_]{1,})$/;
    const wikipediaDomain = 'https://en.wikipedia.org';
    let $;
    let title;
    
    request(url, (error, response, html) => {
        if (error) {
            // assume all errors mean that the wiki article link is not valid
            return callback(404, 'Wiki article not found.');
        }
        $ = cheerio.load(html);
        title = ($('h1#firstHeading').text()).trim();

        arr.push(title);

        if (title === "Philosophy") {
            return callback(200, arr);
        }
   		
        let link;

        $('p', 'div#mw-content-text').each( function (index, element) {            
            $('a', $(element)).each( function (index, element) {
            	const anchorText = $(element).text();            	
                if (matchLinkText.test(anchorText)) {                	
                    link = $(element).attr('href');
                    return false;
                }
            });
            if (link) {
            	return false;
            }
        });

        if (link) {
	        wikiIteration(
	            wikipediaDomain + link,
	            callback,
	            arr
	        );        	
        } else {
         	return callback(404, 'Wiki link path breakage.');        	
        }

    });
};

app.get("/path-to-philosophy/:wikiUrl", (req, res) => {
    const validateWikiUrl = /^((https?):\/\/)?en\.wikipedia\.org\/wiki\/([a-z0-9\-:_]{1,})$/i;

    if (!validateWikiUrl.test(req.params.wikiUrl)) {
        return res.status(422)
            .send('Invalid URL format / wiki (english) url format.');
    }

    return wikiIteration(req.params.wikiUrl, (code, body) => {
        return res.status(code)
            .send(body);
    });
});

app.listen(port);
console.log('Listening on port ' + port);
module.exports = app; // for testing