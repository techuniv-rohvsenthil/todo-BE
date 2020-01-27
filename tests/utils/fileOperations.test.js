let {init} = require('../../server');
const fs = require('promise-fs');
const fileOperations = require('../../utils/fileOperations');
const str = '{"notes":[{"title":"Note 1","description":"Note 1 description","noteId":"gaqa5v6","isActive":"true"},{"title":"Note 2","description":"Note 2 description","noteId":"r7uf6tc","isActive":"true"},{"title":"Note 3","description":"Note 3 description","noteId":"8tjrema","isActive":"true"},{"title":"Note 4","description":"Note 4 description","noteId":"myuqpje","isActive":"true"}]}';

describe('the utils,', () => {  
	
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});

	it('should call readFromNotes handler function which calls a fs.readFile when /notes is hit with GET', async (done) => {
		const mockFsReadFile = jest.spyOn(fs, 'readFile');
		await fileOperations.readFromNotes('./listOfNotes.json');
		expect(mockFsReadFile).toHaveBeenCalled();
		mockFsReadFile.mockRestore();
		done();
	});

	it('should call writeToNotes handler function which calls a fs.writeFile when /notes is hit with GET', async (done) => {
		const mockFsWriteFile = jest.spyOn(fs, 'writeFile');
		await fileOperations.writeToNotes('./listOfNotes.json', str);
		expect(mockFsWriteFile).toHaveBeenCalled();
		mockFsWriteFile.mockRestore();
		done();
	});

});


