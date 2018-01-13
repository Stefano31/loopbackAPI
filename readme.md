# Loopback API for Node.js

### Installation

Loopback requires [Node.js](https://nodejs.org/) v4+ to run.
If you want install Loopback local to your project use 
```
$ npm install --save loopback-api
```
Or for global install use
```
$ npm install -g loopback-api
```

### Usage
```js
const LoopbackAPI = require('loopback-api').LoopbackAPI;
var loopbackAPI = new LoopbackAPI('http://localhost:3100/api');
var Users = loopbackAPI.getModel('Users');

// WITH PROMISE
Users.find({
    where: {
        name: 'Jon'
    }
}).then(users => {
    console.log('users: ', users);
});

// WITH ASYNC/AWAIT
async () => {
    var user = await Users.findById(1);
    console.log('user: ', user);
}();
```

### Base methods
Each model has the following methods:
* findById(id)
* create(data)
* count(where)
* updateById(id, data)
* find(filter)
* findOne(filter)
* update(where, data)
* deleteById(id)
* delete(where): deleteAll must be active on your server Loopback to use this method.

Where inputs are:
* filter: is a JSON object containing the query filters. See [filter Loopback](https://loopback.io/doc/en/lb3/Querying-data.html#filters).
* where: is a JSON object containing specifies a set of logical conditions to match, similar to a WHERE clause in a SQL query. See [where Loopback](https://loopback.io/doc/en/lb3/Where-filter.html)
* data: is a JSON object containing the single model instance or an array instances.

### Debug
When you start your application set [DEBUG environment variable](https://github.com/visionmedia/debug#environment-variables) so you can see all debug messages of Loopback API package. 
```
DEBUG=LP* node your_app.js
```

### Contributors
[Stefano31](https://github.com/Stefano31)


License
----

MIT
