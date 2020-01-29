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

const deleteNoteDB = async (id) => {
	await sequelize.query(
		`DELETE FROM notes WHERE noteid = '${id}'`,
		{
			type: sequelize.QueryTypes.DELETE,
		},
	);
};

module.exports = {selectNotesDB, insertNoteDB, deleteNoteDB};
