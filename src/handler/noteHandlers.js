const dbOperations = require('../utils/dbOperations');

const postNote = async (request, h) => {
	try{
		let body = request.payload;	
		await dbOperations.insertNoteDB(body); 
		return h.response('Note added').code(200);
	}
	catch(err){
		return h.response(err.message).code(500); 
	}
};

const getNotes = async (response, h) => {
	try{
		let notes = await dbOperations.selectNotesDB();
		return h.response(notes).code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

const deleteNote = async (request, h) => {
	try{
		let id = request.params.id;
		await dbOperations.deleteNoteDB(id);     
		return h.response('Note deleted').code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

const changeStateOfNote = async (request, h) => {
	try{
		const id = request.params.id;
		await dbOperations.updateNoteDB(id);
		return h.response('State changed').code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

module.exports = {getNotes, postNote, deleteNote, changeStateOfNote};