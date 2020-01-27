const {getNotes, getQuote, postNote, deleteNote, modifyNote} = require('../handler/noteHandlers');
const Joi = require('@hapi/joi');
const {postNoteSchema, deleteNoteSchema} = require('../schema/noteSchema');

const routeArray = [
	{path: '/notes', method: 'GET', handler: getNotes},
	{path: '/quotes', method: 'GET', handler: getQuote},
	{path: '/notes', method: 'POST', config: { handler: postNote, validate: {payload: postNoteSchema}}},
	{path: '/notes/{id}', method: 'DELETE', config: { handler: deleteNote, validate: {params: deleteNoteSchema}}},
	{path: '/notes/{id}', method: 'PUT', handler: modifyNote}
];
module.exports = routeArray;