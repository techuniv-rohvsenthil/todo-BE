const fs = require('promise-fs');
const {getNotes, getQuote, postNote, deleteNote, modifyNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');
const dailyQuote = require('inspirational-quotes');

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
			url: '/notes/ysqyvwk',
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


	it('should call the getQuote handler function when /quotes is hit with GET', async (done) => {
		dailyQuote.getRandomQuote = jest.fn();
		const mockResponse = {
			response: jest.fn()
		};
		getQuote(null, mockResponse);
		expect(dailyQuote.getRandomQuote).toHaveBeenCalled();
		expect(mockResponse.response).toHaveBeenCalled();
		dailyQuote.getRandomQuote.mockRestore();
		mockResponse.response.mockRestore();
		done();
	});


});
