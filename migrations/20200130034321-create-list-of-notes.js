'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('listofnotes', {
			title: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			noteId: {
				primaryKey: true,
				type: Sequelize.UUID
			},
			isActive: {
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('listofnotes');
	}
};