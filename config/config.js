module.exports = {
	development: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
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
