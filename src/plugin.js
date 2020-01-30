const Sequelize = require('sequelize');

module.exports = {
	name: 'DBPlugin',
	register: async (server, options) => {
		const DBsequelize = new Sequelize('postgres://Rohini_Senthil:@localhost:5432/todo_db');
		console.log('established connection');
		server.decorate('server', 'sequelize', DBsequelize);
	},
};