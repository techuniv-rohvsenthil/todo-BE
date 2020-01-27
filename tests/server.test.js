let {init} = require('../server');
const fs = require('promise-fs');
const {getNotes, getQuote, postNote, deleteNote, modifyNote} = require('../handler/noteHandlers');
const fileOperations = require('../utils/fileOperations');
const dailyQuote = require('inspirational-quotes');
const str = '{"notes":[{"title":"Note 1","description":"Note 1 description","noteId":"gaqa5v6","isActive":"true"},{"title":"Note 2","description":"Note 2 description","noteId":"r7uf6tc","isActive":"true"},{"title":"Note 3","description":"Note 3 description","noteId":"8tjrema","isActive":"true"},{"title":"Note 4","description":"Note 4 description","noteId":"myuqpje","isActive":"true"}]}';

describe('the server,', () => {  
	
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});

	it('should get all notes when /notes is hit with GET', async (done) => {
		let obj = {
			method: 'GET',
			url: '/notes'
		};
		const res = await server.inject(obj);
		expect(res.payload).toBe(str);
		done();
	});

	it('should get all notes when /notes is hit with POST', async (done) => {
		let obj = {
			method: 'POST',
			url: '/notes',
			payload: {
				title: 'Note 5',
				description: 'Note 5 description'
			}
		};
		const res = await server.inject(obj);
		expect(res.payload).toBe('Note added');
		done();
	});


});


