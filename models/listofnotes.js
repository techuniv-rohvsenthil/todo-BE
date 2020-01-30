'use strict';
module.exports = (sequelize, DataTypes) => {
	const listOfNotes = sequelize.define('listofnotes', {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		noteId: DataTypes.UUID,
		isActive: DataTypes.BOOLEAN
	}, {});
	listOfNotes.associate = function(models) {
		// associations can be defined here
	};
	return listOfNotes;
};