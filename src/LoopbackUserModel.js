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

    async changePassword (oldPassword, newPassword) {
        const url = `${this.url}/change-password`;
        var response = false;
        var qs = this._initQsWithToken();
        try {
            response = await request.post({
                uri: url,
                qs: qs,
                form: {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
                json: true
            });
            response = true;
            this.debug('changePassword: ', response);
        }
        catch (e) {
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    async logout () {
        const url = `${this.url}/logout`;
        var response = false;
        var qs = this._initQsWithToken();
        try{
            response = await request.post({
                uri: url,
                qs: qs,
                json: true
            });
            response = true;
            this.debug('logout: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    async setNewPassword (newPassword, token) {
        const url = `${this.url}/reset-password`;
        var response = false;
        try {
            response = await request.post({
                uri: url,
                qs: {
                    access_token: token
                },
                form: {
                    newPassword: newPassword
                },
                json: true
            });
            response = true;
            this.debug('setNewPassword: ', response);
        }
        catch (e) {
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    async resetPassword (email) {
        const url = `${this.url}/reset`;
        var response = false;
        try {
            response = await request.post({
                uri: url,
                body: {
                    email: email
                },
                json: true
            });
            response = true;
            this.debug('resetPassword: ', response);
        }
        catch (e) {
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }
}


module.exports = LoopbackUserModel;
