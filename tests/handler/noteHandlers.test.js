const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');

describe('the getNotes handler function,', () => {  

	it('should call readFromNotes when /notes is hit with GET', async (done) => {
		const mock = {
			response: jest.fn()
		};
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		await getNotes(null, mock);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mock.response).toHaveBeenCalled();
		mockReadFromNotes.mockRestore();
		mock.response.mockRestore();
		done();
	});
});

describe('the postNote handler function,', () => {  

	it('should call readFromNotes and writetoNotes when /notes is hit with POST', async (done) => {
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

});

describe('the deleteNote handler function,', () => {  

	it('should call readFromNotes and writeToNotes when /notes/{id} is hit with DELETE', async (done) => {
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

});

describe('the changeStateOfNote handler function,', () => {  

	it('should call readFromNotes and writeToNotes function when /notes/{id} is hit with PUT', async (done) => {
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
