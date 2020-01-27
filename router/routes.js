const {getNotes, getQuote, postNote, deleteNote, modifyNote} = require('../handler/noteHandlers');

const routeArray = [
	{path: '/notes', method: 'GET', handler: getNotes},
	{path: '/quotes', method: 'GET', handler: getQuote},
	{path: '/notes', method: 'POST', handler: postNote},
	{path: '/notes/{id}', method: 'DELETE', handler: deleteNote},
	{path: '/notes/{id}', method: 'PUT', handler: modifyNote}
];
module.exports = routeArray;