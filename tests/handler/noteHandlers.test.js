const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');

describe('the getNotes handler function,', () => {  

	it('should call h.response with success message when /notes is hit with GET', async () => {
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return {
					code: mockCode
				};
			})
		};
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		await getNotes(null, mockH);
		expect(mockH.response).toHaveBeenCalledWith(mockReadFromNotesResponse);
		expect(mockCode).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
	});

	it('should return a statusCode: 500 when the file read fails', async (done) => {
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		mockReadFromNotes.mockRejectedValue(new Error('Read file failed'));
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => ({ 
				code: mockCode 
			}))
		};
		await getNotes(null, mockH);
		expect(mockCode).toHaveBeenCalledWith(500);
		expect(mockH.response).toHaveBeenCalledWith('Read file failed');
		mockReadFromNotes.mockRestore();
		done();
	});

});

describe('the postNote handler function,', () => {  

	it('should call h.response with success message when /notes is hit with POST', async (done) => {
		const mockRequest = {
			payload: {
				title: 'Note new',
				description: 'Note new description'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockResolvedValue();
		await postNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note added');
		expect(mockCode).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should return statusCode: 500 adding new note fails', async (done) => {
		const mockRequest = {
			payload: {
				title: 'Note new',
				description: 'Note new description'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockRejectedValue(new Error('Failed to add note'));
		await postNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Failed to add note');
		expect(mockCode).toHaveBeenCalledWith(500);
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
		const codeMock = jest.fn();
		const mockH = {
			response: () => {
				return{
					code: codeMock
				};
			}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await deleteNote(mockRequest, mockH);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(200);
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
		const codeMock = jest.fn();
		const mockH = {
			response: () => {
				return{
					code: codeMock
				};
			}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await changeStateOfNote(mockRequest, mockH);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(200);
		done();
	});


});
