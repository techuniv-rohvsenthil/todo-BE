const uuid = require('uuid');
const db = require('../../models/index');

const selectNotesDB = async () => {
	const notes = await db.notes.findAll();
	return notes;
};

const insertNoteDB = async (body) => {
	await db.notes.create({ title: body.title, description: body.description, noteId: uuid(), isActive: true });

};

// const deleteNoteDB = async (sequelize, id) => {
// 	await sequelize.query(
// 		`DELETE FROM notes WHERE noteid = '${id}'`,
// 		{
// 			type: Sequelize.QueryTypes.DELETE,
// 		},
// 	);
// };

// const updateNoteDB = async (sequelize, id) => {
// 	await sequelize.query(
// 		`UPDATE notes SET isactive = NOT isactive WHERE noteid = '${id}'`,
// 		{
// 			type: Sequelize.QueryTypes.UPDATE,
// 		},
// 	);
// };

//module.exports = {selectNotesDB, insertNoteDB, deleteNoteDB, updateNoteDB};
module.exports = {selectNotesDB, insertNoteDB};
