'use strict';

const request = require('request-promise');

class LoopbackModel {

    constructor(model, loopbackApi) {
        this.debug = require('debug')(`LP:MODEL:${model}`);
        this.url = loopbackApi.getUrl() + '/' + model;
        this.model = model;
    }

    // OK
    async findById(id) {
        const url = `${this.url}/${id}`;
        var response = false;
        try{
            response = await request.get({
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
        const url = `${this.url}`;
        var response = await request.post({
            uri: url,
            body: data,
            json: true
        });
        this.debug('create: ', response);
        return response;
    }

    // OK
    async count(where) {
        const url = `${this.url}/count`;
        var response = await request.get({
            uri: url,
            qs: {
                where: where
            },
            json: true
        });
        this.debug('count: ', response);
        return response;
    }

    // OK
    async updateById(id, data) {
        const url = `${this.url}/${id}`;
        var response = false;
        try{
            response = await request.patch({
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
        const url = `${this.url}`;
        var response = await request.get({
            uri: url,
            qs: {
                filter: filter
            },
            json: true
        });
        this.debug('find: ', response);
        return response;
    }

    // OK
    async findOne(query) {
        const url = `${this.url}/findOne`;
        var response = false;
        try{
            response = await request.get({
                uri: url,
                qs: {
                    filter: query
                },
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
        try{
            response = await request.post({
                uri: url,
                qs: {
                    where: where
                },
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
        try{
            response = await request.delete({
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
        try{
            response = await request.delete({
                uri: this.url,
                qs: {
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
