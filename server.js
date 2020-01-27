const routes = require('./router/routes');
const Hapi = require('@hapi/hapi');

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


server.route(routes);

//server.start();
console.log('Server started');

module.exports = {
	init,
	start
};


