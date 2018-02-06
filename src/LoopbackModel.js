'use strict';

const request = require('request-promise');

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
            response = await request.get({
                qs: this._initQsWithToken(),
                uri: url,
                json: true
            });
            this.debug('findById: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    // OK
    async create(data) {
        var response = false;
        try{
            const url = `${this.url}`;
            response = await request.post({
                qs: this._initQsWithToken(),
                uri: url,
                body: data,
                json: true
            });
            this.debug('create: ', response);
        }
        catch(e){
            this.debug('response: ', e);
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    // OK
    async count(where) {
        var response = false;
        try{
            const url = `${this.url}/count`;
            var qs = this._initQsWithToken();
            qs.where = where;
            response = await request.get({
                uri: url,
                qs: qs,
                json: true
            });
            this.debug('count: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    // OK
    async updateById(id, data) {
        const url = `${this.url}/${id}`;
        var response = false;
        try{
            response = await request.patch({
                qs: this._initQsWithToken(),
                uri: url,
                body: data,
                json: true
            });
            this.debug('updateById: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    async find(filter) {
        var response = false;
        try{
            const url = `${this.url}`;
            var qs = this._initQsWithToken();
            qs.filter = filter;
            response = await request.get({
                uri: url,
                qs: qs,
                json: true
            });
            this.debug('find: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    // OK
    async findOne(query) {
        const url = `${this.url}/findOne`;
        var response = false;
        var qs = this._initQsWithToken();
        qs.filter = query;
        try{
            response = await request.get({
                uri: url,
                qs: qs,
                json: true
            });
            this.debug('findOne: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    // OK
    async update(where, data){
        const url = `${this.url}/update`;
        var response = false;
        var qs = this._initQsWithToken();
        qs.where = where;
        try{
            response = await request.post({
                uri: url,
                qs: qs,
                body: data,
                json: true
            });
            this.debug('update: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    // OK
    async deleteById(id) {
        const url = `${this.url}/${id}`;
        var response = false;
        var qs = this._initQsWithToken();
        try{
            response = await request.delete({
                qs: qs,
                uri: url,
                json: true
            });
            this.debug('deleteById: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }

    async delete(where) {
        var response = false;
        var qs = this._initQsWithToken();
        try{
            response = await request.delete({
                qs: qs,
                uri: this.url,
                body: {
                    where: where
                },
                json: true
            });
            this.debug('delete: ', response);
        }
        catch(e){
            this.debug('ERROR: ', e.error.error);
        }
        return response;
    }
}


module.exports = LoopbackModel;
