'use strict';

const request = require('request-promise');
const LoopbackModel = require('./LoopbackModel');

class LoopbackUserModel extends LoopbackModel {

    async login(email, password){
        const url = `${this.url}/login`;
        var response = false;
        try{
            response = await request.post({
                uri: url,
                body: {
                    email: email,
                    password: password
                },
                json: true
            });
            this.debug('login: ', response);
            this.loopbackApi.setAccessToken(response.id);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }
}


module.exports = LoopbackUserModel;
