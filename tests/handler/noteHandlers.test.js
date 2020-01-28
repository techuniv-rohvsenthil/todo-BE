const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');

describe('the handlers,', () => {  

	it('should call the getNotes handler function when /notes is hit with GET', async (done) => {
		const mock = {
			response: jest.fn()
		};
		await getNotes(null, mock);
		expect(mock.response).toHaveBeenCalled();
		mock.response.mockRestore();
		done();
	});

	it('should call the postNotes handler function when /notes is hit with POST', async (done) => {
		const mockRequest = {
			payload: {
				title: 'Note new',
				description: 'Note new description'
			}
		};
		const mockH = {
			response: () => {}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await postNote(mockRequest, mockH);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should call the deleteNote handler function when /notes/{id} is hit with DELETE', async (done) => {
		const mockRequest = {
			params: {
				id: 'tb018tp'
			}
		};
		const mockH = {
			response: () => {}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await deleteNote(mockRequest, mockH);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should call the changeStateOfNote handler function when /notes/{id} is hit with PUT', async (done) => {
		const mockRequest = {
			params: {
				id: 'gaqa5v6'
			}
		};
		const mockH = {
			response: () => {}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await changeStateOfNote(mockRequest, mockH);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});


});
