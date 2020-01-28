const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');

describe('the getNotes handler function,', () => {  

	it('should call readFromNotes when /notes is hit with GET', async (done) => {
		const mockCode = jest.fn();
		const mock = {
			response: () => {
				return {
					code: mockCode
				};
			}
		};
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		await getNotes(null, mock);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockCode).toHaveBeenCalledWith(200);
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
		const mockCode = jest.fn();
		const mockH = {
			response: () => {
				return{
					code: mockCode
				};
			}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await postNote(mockRequest, mockH);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		expect(mockCode).toHaveBeenCalledWith(200);
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
