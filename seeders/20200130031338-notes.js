'use strict';
const uuid = require('uuid');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('notes', [{
			title: 'New Note',
			description: 'New note description',
			noteId: uuid(),
			isActive:  true,
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('notes', null, {});
	}
};
