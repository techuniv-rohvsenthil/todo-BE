const fs = require('promise-fs');
const fileOperations = require('../../src/utils/fileOperations');
const str = '{"notes":[{"title":"Note 1","description":"Note 1 description","noteId":"gaqa5v6","isActive":"true"},{"title":"Note 2","description":"Note 2 description","noteId":"r7uf6tc","isActive":"true"},{"title":"Note 3","description":"Note 3 description","noteId":"8tjrema","isActive":"true"},{"title":"Note 4","description":"Note 4 description","noteId":"myuqpje","isActive":"true"}]}';

describe('the readFromNotes helper function,', () => {  

	it('should call fs.readFile when /notes is hit with GET', async (done) => {
		const mockFsReadFile = jest.spyOn(fs, 'readFile');
		const mockFsReadFileResponse = JSON.stringify({
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		});
		mockFsReadFile.mockResolvedValue(mockFsReadFileResponse);
		await fileOperations.readFromNotes('./abc.json');
		expect(mockFsReadFile).toHaveBeenCalled();
		mockFsReadFile.mockRestore();
		done();
	});

});

describe('the writeToNotes helper function,', () => {  

	it('should call fs.writeFile when /notes is hit with GET', async (done) => {
		const mockFsWriteFile = jest.spyOn(fs, 'writeFile');
		mockFsWriteFile.mockResolvedValue();

		await fileOperations.writeToNotes('./abc.json', str);
		expect(mockFsWriteFile).toHaveBeenCalled();
		mockFsWriteFile.mockRestore();
		done();
	});

});


