const {getNotes, postNote, deleteNote, changeStateOfNote, pong} = require('../handler/noteHandlers');
const getQuote = require('../handler/quoteHandlers');
const {postNoteSchema, deleteNoteSchema} = require('../schema/noteSchema');

const routeArray = [
	{path: '/notes', method: 'GET', handler: getNotes},
	{path: '/quotes', method: 'GET', handler: getQuote},
	{path: '/notes', method: 'POST', config: { handler: postNote, validate: {payload: postNoteSchema}}},
	{path: '/notes/{id}', method: 'DELETE', config: { handler: deleteNote, validate: {params: deleteNoteSchema}}},
	{path: '/notes/{id}', method: 'PUT', handler: changeStateOfNote},
	{path: '/ping', method: 'GET', handler: pong},
];
module.exports = routeArray;