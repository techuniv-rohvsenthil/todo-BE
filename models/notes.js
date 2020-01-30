'use strict';
module.exports = (sequelize, DataTypes) => {
	const notes = sequelize.define('notes', {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		noteId: {
			type: DataTypes.UUID,
			primaryKey: true
		},
		isActive: DataTypes.BOOLEAN
	}, {});
	notes.associate = function(models) {
		// associations can be defined here
	};
	return notes;
};