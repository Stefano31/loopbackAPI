//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

// Require app dependencies
const LoopbackAPI = require('../src/LoopbackAPI');
const LoopbackModel = require('../src/LoopbackModel');
const hiveUrl = 'http://localhost:3100/api';

chai.use(chaiHttp);

// Init
let loopbackAPI = new LoopbackAPI(hiveUrl);
let Admins = loopbackAPI.getUser('Admins');
let Leads = loopbackAPI.getModel('Leads');

/*
 * LoopbackUserModel login.
 */
describe('LoopbackUserModel login', () => {
    it('it should login in', async () => {
        let response = await Admins.login('stefano.giurgiano@heres.ai', 'console20.');
        response.should.be.a('object');
        response.should.have.property('id');
    });
});

/*
 * LoopbackModel create, find, count, findOne updateById.
 * create, find, deleteById, delete, logout
 */
describe('LoopbackModel create', () => {
    it('it should create a new record', async () => {
        let lead = await Leads.create({
            source: 'chat',
            chatId: 'XYZ'
        });
        lead.should.be.a('object');
        lead.should.have.property('id');
        describe('LoopbackModel find', () => {
            it('it should find a record', async () => {
                let foundedLead = await Leads.findById(lead.id);
                foundedLead.should.be.a('object');
                foundedLead.should.have.property('id');
                // foundedLead.should.to.deep.equal(lead);
            });
        });
        describe('LoopbackModel count', () => {
            it('it should count a record', async () => {
                let response = await Leads.count({id: lead.id});
                response.should.be.a('object');
                response.should.have.property('count');
                response.count.should.to.equal(1);
            });
        });
        describe('LoopbackModel findOne', () => {
            it('it should fine one a record', async () => {
                let response = await Leads.findOne({where: {id: lead.id}});
                response.should.be.a('object');
                response.should.have.property('id');
            });
        });
        describe('LoopbackModel updateById', () => {
            it('it should update by id a record', async () => {
                let updatedLead = await Leads.updateById(lead.id, {firstName: 'Testing'});
                updatedLead.should.be.a('object');
                updatedLead.should.have.property('id');
                updatedLead.firstName.should.to.equal('Testing');
            });
        });
    });
});