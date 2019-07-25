process.env.NODE_ENV = 'staging';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /api/v1/validators', function() {
    it('should return all validators', function(done) {
      chai.request(server)
      .get('/api/v1/validators')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.data.should.be.a('array');
      res.body.data.length.should.equal(14);
      for (index = 0; index < res.body.data.length; ++index) {
        res.body.data[index].should.have.property('address');
        res.body.data[index].should.have.property('voting_power');
        res.body.data[index].should.have.property('proposer_priority');
        res.body.data[index].should.have.property('pub_key');
      }
      done();
      });
    });
  });

  describe('GET /api/v1/validator/:id', function() {
    it('should return a single validator', function(done) {
      chai.request(server)
      .get('/api/v1/validator/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('voting_power');
        res.body.data.should.have.property('proposer_priority');
        res.body.data.should.have.property('pub_key');
        done();
      });
    });
  });

  describe('POST /api/v1/validator', function() {
    it('should add a validator', function(done) {
      chai.request(server)
      .post('/api/v1/validator')
      .send({
        address: '00B587BAA478C3FCD0A1AE34658764BCE01A2A41',
        voting_power : '41804567897900000',
        proposer_priority: '413782612345646456',
        pub_key: {"type":"tendermint/PubKeyEd123456","value":"H/T2zkDfFx7ZKgDCXPhjkdfghdisyrARiptSNEBxPQkXRXIIM="}
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('address');
        res.body.address.should.equal('00B587BAA478C3FCD0A1AE34658764BCE01A2A41');
        res.body.should.have.property('voting_power');
        res.body.voting_power.should.equal('41804567897900000');
        res.body.should.have.property('proposer_priority');
        res.body.proposer_priority.should.equal('413782612345646456');
        res.body.should.have.property('pub_key');
        done();
      });
    });
  });

  describe('PUT /api/v1/validator/:id', function() {
    it('should update a validator', function(done) {
      chai.request(server)
      .put('/api/v1/validator/1')
      .send({
        address: '00B587BAA478C3FC5468789546578974BCE01A2A41',
        voting_power: '418045677894564897'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('address');
        res.body.data.address.should.equal('00B587BAA478C3FC5468789546578974BCE01A2A41');
        res.body.data.should.have.property('voting_power');
        res.body.data.voting_power.should.equal('418045677894564897');
        res.body.data.should.have.property('proposer_priority');
        res.body.data.proposer_priority.should.equal('41378266209084499');
        res.body.data.should.have.property('pub_key');
        done();
      });
    });
    it('should NOT update a validator if the id field is part of the request', function(done) {
      chai.request(server)
      .put('/api/v1/validator/1')
      .send({
        id: 20,
        address: '00B587BAA478C3FC5468789546578974BCE01A2A41',
        voting_power: '418045677894564897'
      })
      .end(function(err, res) {
        res.should.have.status(422);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('You cannot update the id field');
        done();
      });
    });
  });
});