'use strict';

const LoopbackModel = require('./LoopbackModel');
const LoopbackUserModel = require('./LoopbackUserModel');

class LoopbackAPI {

    constructor(url) {
        this.url = url;
        this.accessToken = null;
    }

    setAccessToken(token){
        this.accessToken = token;
    }

    getUrl() {
        return this.url;
    }

    getModel(name) {
        return new LoopbackModel(name, this);
    }

    getUser(name){
        return new LoopbackUserModel(name, this);
    }
}

module.exports = LoopbackAPI;
