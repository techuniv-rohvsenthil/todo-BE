const uid = require('uid');
const fileOperations = require('../utils/fileOperations');

const postNote = async (request, h) => {
	try{
		let body = request.payload;	
		body.noteId = uid();
		body.isActive = true;
		let data = await fileOperations.readFromNotes('./listOfNotes.json');     
		let arrayOfNotes = JSON.parse(data);
		arrayOfNotes.notes.push(body);
		await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(arrayOfNotes));
		return h.response('Note added').code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}
};

const getNotes = async (response, h) => {
	try{
		let notes = await fileOperations.readFromNotes('./listOfNotes.json');
		let parsedNotes = JSON.parse(notes);
		return h.response(parsedNotes).code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

const deleteNote = async (request, h) => {
	try{
		let id = request.params.id;
		let data = await fileOperations.readFromNotes('./listOfNotes.json');     
		let arrayOfNotes = JSON.parse(data);
		arrayOfNotes.notes = arrayOfNotes.notes.filter(function(obj) {
			return obj.noteId != id;
		});
		await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(arrayOfNotes));
		return h.response('Note deleted').code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

const changeStateOfNote = async (request, h) => {
	try{
		let data = await fileOperations.readFromNotes('./listOfNotes.json');
		let arrayOfNotes = JSON.parse(data);     
		const noteId = request.params.id;
		let id = 0;
		arrayOfNotes.notes.forEach((note) => {
			if (note.noteId === noteId) {
				arrayOfNotes.notes[id].isActive = !arrayOfNotes.notes[id].isActive;
				return;
			}
			id += 1;
		});
		await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(arrayOfNotes));
		return h.response('State changed').code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

module.exports = {getNotes, postNote, deleteNote, changeStateOfNote};