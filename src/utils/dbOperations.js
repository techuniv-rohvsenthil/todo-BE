const sequelize = require('../dbConnection');
const uuid = require('uuid');

const selectNotesDB = async () => {
	const notes = await sequelize.query('SELECT * FROM notes', { type: sequelize.QueryTypes.SELECT });
	return notes;
};

const insertNoteDB = async (noteValues) => {
	await sequelize.query(
		'INSERT INTO notes (title, description, noteId, isActive) VALUES (:title, :description, :noteId, :isActive)',
		{
			replacements: {
				title: noteValues.title,
				description: noteValues.description,
				noteId: uuid(),
				isActive: true,
			},
			type: sequelize.QueryTypes.INSERT,
		},
	);
};

module.exports = {selectNotesDB, insertNoteDB};
