'use strict';

const LoopbackModel = require('./LoopbackModel');

class LoopbackAPI {

    constructor(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }

    getModel(name) {
        return new LoopbackModel(name, this);
    }
}

module.exports = LoopbackAPI;
