const routes = require('./src/router/routes');
const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');

const server = Hapi.Server({
	host: '0.0.0.0',
	port: 80,
	routes: {
		cors: true
	}
});

server.validator(Joi);
server.route(routes);

// const registerPlugin = async () => {
// 	await server.register(dbPlugin);
// 	await server.start();
// };

server.start();

//registerPlugin();
console.log('Server started');