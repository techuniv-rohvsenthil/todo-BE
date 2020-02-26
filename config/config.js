module.exports = {
	development: {
		username: process.env.username,
		password: process.env.password,
		database: process.env.database,
		host: process.env.host,
		dialect: 'postgres',
		operatorsAliases: false
	},
	test: {
		username: 'Rohini_Senthil',
		password: null,
		database: 'todo_db',
		host: '127.0.0.1',
		dialect: 'postgres',
		operatorsAliases: false
	},
	production: {
		username: 'Rohini_Senthil',
		password: null,
		database: 'todo_db',
		host: '127.0.0.1',
		dialect: 'postgres',
		operatorsAliases: false
	}
};
