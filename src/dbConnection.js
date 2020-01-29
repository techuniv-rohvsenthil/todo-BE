const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://Rohini_Senthil:@localhost:5432/todo_db');
module.exports = sequelize;