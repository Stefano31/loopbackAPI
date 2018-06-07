'use strict';

const axios = require('axios');

class LoopbackModel {

    constructor(model, loopbackApi) {
        this.debug = require('debug')(`LP:MODEL:${model}`);
        this.loopbackApi = loopbackApi;
        this.url = loopbackApi.getUrl() + '/' + model;
        this.model = model;
    }

    _initQsWithToken(){
        var qs = {};
        if(this.loopbackApi.accessToken){
            qs.access_token = this.loopbackApi.accessToken;
        }
        return qs;
    }

    // OK
    async findById(id) {
        const url = `${this.url}/${id}`;
        var response = false;
        try{
            response = await axios.get(url, {
                params: this._initQsWithToken(),
            });
            response = response.data;
            this.debug('findById: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    // OK
    async create(data) {
        var response = false;
        try{
            const url = `${this.url}`;
            response = await axios.post(url, data, {
                params: this._initQsWithToken(),
            });
            response = response.data;
            this.debug('create: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    // OK
    async count(where) {
        var response = false;
        try{
            const url = `${this.url}/count`;
            var qs = this._initQsWithToken();
            qs.where = JSON.stringify(where);
            response = await axios.get(url, {
                params: qs,
            });
            response = response.data;
            this.debug('count: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    // OK
    async updateById(id, data) {
        const url = `${this.url}/${id}`;
        var response = false;
        try{
            response = await axios.patch(url, data, {
                params: this._initQsWithToken(),
            });
            response = response.data;
            this.debug('updateById: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    async find(filter) {
        var response = false;
        try{
            const url = `${this.url}`;
            var qs = this._initQsWithToken();
            qs.filter = JSON.stringify(filter);
            response = await axios.get(url, { params: qs });
            response = response.data;
            this.debug('find: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    // OK
    async findOne(query) {
        const url = `${this.url}/findOne`;
        var response = false;
        var qs = this._initQsWithToken();
        qs.filter = JSON.stringify(query);
        try{
            response = await axios.get(url, { params: qs });
            response = response.data;
            this.debug('findOne: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    // OK
    async update(where, data){
        const url = `${this.url}/update`;
        var response = false;
        var qs = this._initQsWithToken();
        qs.where = JSON.stringify(where);
        try{
            response = await axios.post(url, data, { params: qs });
            response = response.data;
            this.debug('update: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    // OK
    async deleteById(id) {
        const url = `${this.url}/${id}`;
        var response = false;
        var qs = this._initQsWithToken();
        try{
            response = await axios.delete(url, { params: qs });
            response = response.data;
            this.debug('deleteById: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }

    async delete(where) {
        var response = false;
        var qs = this._initQsWithToken();
        qs.where = where;
        try{
            await axios.delete(this.url, { params: qs });
            response = true;
            this.debug('delete: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.response.status, e.response.statusText);
        }
        return response;
    }
}


module.exports = LoopbackModel;
