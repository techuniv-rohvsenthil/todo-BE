const uid = require('uid');
const fileOperations = require('../utils/fileOperations');
const dailyQuote = require('inspirational-quotes');

const postNote = async (request, h) => {
	let body = request.payload;	
	body.noteId = uid();
	body.isActive = true;
	let data = await fileOperations.readFromNotes('./listOfNotes.json');     
	let arrayOfNotes = JSON.parse(data);
	arrayOfNotes.notes.push(body);
	await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(arrayOfNotes));
	return h.response('Note added');
};

const getNotes = async (response, h) => {

	let notes = await fileOperations.readFromNotes('./listOfNotes.json');
	let parsedNotes = JSON.parse(notes);
	return h.response(parsedNotes);

};

const getQuote = (response, h) => {
	let quote = dailyQuote.getRandomQuote();
	return h.response(quote);

};

const deleteNote = async (request, h) => {
	let url = request.url.toString().split('/');
	let id = url[url.length - 1]; //params
	let data = await fileOperations.readFromNotes('./listOfNotes.json');     
	let arrayOfNotes = JSON.parse(data);
	arrayOfNotes.notes = arrayOfNotes.notes.filter(function(obj) {
		return obj.noteId != id;
	});
	await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(arrayOfNotes));
	return h.response('Note deleted');

};

const modifyNote = async (response, h) => {

};

module.exports = {getNotes, getQuote, postNote, deleteNote, modifyNote};