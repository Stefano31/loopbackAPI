const LoopbackAPI = require('../src/LoopbackAPI');
const LoopbackModel = require('../src/LoopbackModel');
const hive = 'http://localhost:3100/api';
const debug = require('debug')('LP:TEST');

class CustomLoopbackModel extends LoopbackModel{
    async merge(){
        return "this is merge.";
    }
}

var loopbackAPI = new LoopbackAPI(hive);
var Leads = loopbackAPI.getModel('Leads');
var Users = loopbackAPI.getUser('Users');
var Admins = loopbackAPI.getUser('Admins');
var Translations = loopbackAPI.getModel('Translations');
var Custom = new CustomLoopbackModel('Leads', loopbackAPI);

async function initTestsAgents(){
    var result = await Users.login('string@live.it', 'ciao');
    debug('token: ', loopbackAPI.accessToken);

    debug('testing create...');
    debug('token translations: ', Translations.loopbackApi.accessToken);
    result = await Translations.create({
        code: 'XYZ',
        valueIt: 'XYZ IT',
        valueEn: 'XYZ EN'
    });

    debug('testing findById...');
    result = await Translations.findById(111);

    debug('testing count...');
    result = await Translations.count({});

    debug('testing find...');
    result = await Translations.find({
        where: {
            code: 'XYZ'
        }
    });

    debug('testing findOne...');
    result = await Translations.findOne({
        where: {
            id: 13
        }
    });

    debug('testing updateById...');
    result = await Translations.updateById(1, {firstName: 'Testing'});

    debug('testing deleteById...');
    result = await Translations.deleteById(12);

    debug('testing update...');
    result = await Translations.update({
        id: {
            gt: 11
        }
    }, {code: "TESTING"});

    await Translations.delete({id: {gte: 8}});

    return true;
}

async function initTestsUser(){
    debug('login..');
    var result = await Admins.login('string@live.it', 'ciao');
    debug('token: ', loopbackAPI.accessToken);
    await Users.logout();
}

async function initTests(){
    var result;
    debug('testing create...');
    result = await Leads.create({
        source: 'chat',
        chatId: 'XYZ'
    });

    debug('testing findById...');
    result = await Leads.findById(111);

    debug('testing count...');
    result = await Leads.count({});

    debug('testing find...');
    result = await Leads.find({
        where: {
            chatId: 'XYZ123'
        }
    });

    debug('testing findOne...');
    result = await Leads.findOne({
        where: {
            id: 13
        }
    });

    debug('testing updateById...');
    result = await Leads.updateById(1, {firstName: 'Testing'});

    debug('testing deleteById...');
    result = await Leads.deleteById(12);

    debug('testing update...');
    result = await Leads.update({
        id: {
            gt: 11
        }
    }, {firstName: "TESTING"});

    debug('testing customModel...');
    await Custom.merge();

    await Leads.delete({id: {gte: 8}});

    return true;
}

initTestsUser().then(() => {
    return;
});