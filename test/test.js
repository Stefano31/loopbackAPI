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

var Custom = new CustomLoopbackModel('Leads', loopbackAPI);

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

    return true;
}

initTests().then(() => {
    return;
});