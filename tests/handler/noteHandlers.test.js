const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');
const dbOperations = require('../../src/utils/dbOperations');
const uuid = require('uuid');

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
		const mockSelectNotesDB = jest.spyOn(dbOperations, 'selectNotesDB');
		const mockSelectNotesDBResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: uuid(),
					isActive: true
				}
			] 
		};
		mockSelectNotesDB.mockResolvedValue(mockSelectNotesDBResponse);
		await getNotes(null, mockH);
		expect(mockH.response).toHaveBeenCalledWith(mockSelectNotesDBResponse);
		expect(mockCode).toHaveBeenCalledWith(200);
		mockSelectNotesDB.mockRestore();
	});

	it('should return a statusCode: 500 when the file read fails', async (done) => {
		const mockSelectNotesDB = jest.spyOn(dbOperations, 'selectNotesDB');
		mockSelectNotesDB.mockRejectedValue(new Error('DB select failed'));
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => ({ 
				code: mockCode 
			}))
		};
		await getNotes(null, mockH);
		expect(mockCode).toHaveBeenCalledWith(500);
		expect(mockH.response).toHaveBeenCalledWith('DB select failed');
		mockSelectNotesDB.mockRestore();
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
		const mockInsertNoteDB = jest.spyOn(dbOperations, 'insertNoteDB');
		mockInsertNoteDB.mockResolvedValue();
		await postNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note added');
		expect(mockCode).toHaveBeenCalledWith(200);
		mockInsertNoteDB.mockRestore();
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
		const mockInsertNoteDB = jest.spyOn(dbOperations, 'insertNoteDB');
		mockInsertNoteDB.mockRejectedValue(new Error('Failed to add note'));
		await postNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Failed to add note');
		expect(mockCode).toHaveBeenCalledWith(500);
		mockInsertNoteDB.mockRestore();
		done();
	});

});

xdescribe('the deleteNote handler function,', () => {  

	it('should call h.response with success message when /notes/{id} is hit with DELETE', async (done) => {
		const mockRequest = {
			params: {
				id: 'tb018tp'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
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
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockResolvedValue();
		await deleteNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note deleted');
		expect(codeMock).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should return statusCode: 500 when delete action fails', async (done) => {
		const mockRequest = {
			params: {
				id: 'tb018tp'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
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
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockRejectedValue(new Error ('Note delete failed'));
		await deleteNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note delete failed');
		expect(codeMock).toHaveBeenCalledWith(500);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

});

xdescribe('the changeStateOfNote handler function,', () => {  

	it('should call h.response with success message when /notes/{id} is hit with PUT', async (done) => {
		const mockRequest = {
			params: {
				id: 'gaqa5v6'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
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
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockResolvedValue();
		await changeStateOfNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('State changed');
		expect(codeMock).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should return statusCode: 500 note is failed to be updated', async (done) => {
		const mockRequest = {
			params: {
				id: 'gaqa5v6'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
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
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockRejectedValue(new Error ('State change failed'));
		await changeStateOfNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('State change failed');
		expect(codeMock).toHaveBeenCalledWith(500);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});


});
