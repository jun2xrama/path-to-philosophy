let chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

const resource = '/path-to-philosophy';
const uriComponent = function buildUri(param) {
    return resource + '/' + encodeURIComponent(param);
};
chai.use(chaiHttp);

describe('/GET path-to-philosophy', function() {
	this.timeout(120000);

    it('it should not allow invalid URLs (wikipedia)', (done) => {
        const invalidUrl = uriComponent('something~!$');
        chai.request(server)
            .get(invalidUrl)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it('it should not allow non-existing wikipedia article links', (done) => {
        const invalidArticle = uriComponent('https://en.wikipedia.org/wiki/None-existing-thingy');
        chai.request(server)
            .get(invalidArticle)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
	
	it('it should avoid wikipedia article links that create a loop', (done) => {
        const pathLoop = uriComponent('https://en.wikipedia.org/wiki/Sand_fence');
        chai.request(server)
            .get(pathLoop)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
    });

    it('it should GET all paths leading to https://en.wikipedia.org/wiki/Philosophy', (done) => {
        const validUrl = uriComponent('https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy');
        chai.request(server)
            .get(validUrl)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
