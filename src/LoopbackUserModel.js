'use strict';

const axios = require('axios');
const LoopbackModel = require('./LoopbackModel');

class LoopbackUserModel extends LoopbackModel {

    async login(email, password){
        const url = `${this.url}/login`;
        let response = await axios.post(url, {
            email: email,
            password: password
        });
        response = response.data;
        this.debug('login: ', response);
        this.loopbackApi.setAccessToken(response.id);
        return response;
    }

    async changePassword (oldPassword, newPassword) {
        const url = `${this.url}/change-password`;
        var response = false;
        var qs = this._initQsWithToken();
        try {
            response = await axios.post(url, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, { params: qs });
            response = true;
            this.debug('changePassword: ', response);
        }
        catch (e) {
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    async logout () {
        const url = `${this.url}/logout`;
        var response = false;
        var qs = this._initQsWithToken();
        try{
            response = await axios.post(url, {}, {
                params: qs
            });
            response = true;
            this.debug('logout: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    async setNewPassword (newPassword, token) {
        const url = `${this.url}/reset-password`;
        var response = false;
        try {
            response = await axios.post(url, { newPassword: newPassword }, { params: { access_token: token }});
            response = true;
            this.debug('setNewPassword: ', response);
        }
        catch (e) {
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    async resetPassword (email) {
        const url = `${this.url}/reset`;
        var response = false;
        try {
            response = await axios.post(url, { email: email });
            response = true;
            this.debug('resetPassword: ', response);
        }
        catch (e) {
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }
}


module.exports = LoopbackUserModel;
