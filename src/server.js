const routes = require('./router/routes');
const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const dbPlugin = require('./plugin');

const server = Hapi.Server({
	host: 'localhost',
	port: 8080
});

const init = async () => {

	await server.initialize();
	return server;
};

const start = async () => {

	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
	return server;
};

//server.validator(Joi);
server.route(routes);

const registerPlugin = async () => {
	await server.register(dbPlugin);
};

registerPlugin();
console.log('Server started');

module.exports = {
	init,
	start
};
