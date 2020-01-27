const routes = require('./src/router/routes');
const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');

const server = Hapi.Server({
	host: 'localhost',
	port: 8080
});

server.validator(Joi);
server.route(routes);
server.start();
console.log('Server started');