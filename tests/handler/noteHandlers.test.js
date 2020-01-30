//const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const {getNotes, postNote} = require('../../src/handler/noteHandlers');
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
				id: uuid()
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
		const mockDeleteNoteDB = jest.spyOn(dbOperations, 'deleteNoteDB');
		mockDeleteNoteDB.mockResolvedValue();
		await deleteNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note deleted');
		expect(codeMock).toHaveBeenCalledWith(200);
		mockDeleteNoteDB.mockRestore();
		done();
	});

	it('should return statusCode: 500 when delete action fails', async (done) => {
		const mockRequest = {
			params: {
				id: uuid()
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
		const mockDeleteNoteDB = jest.spyOn(dbOperations, 'deleteNoteDB');
		mockDeleteNoteDB.mockRejectedValue(new Error ('Note delete failed'));
		await deleteNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note delete failed');
		expect(codeMock).toHaveBeenCalledWith(500);
		mockDeleteNoteDB.mockRestore();
		done();
	});

});

xdescribe('the changeStateOfNote handler function,', () => {  

	it('should call h.response with success message when /notes/{id} is hit with PUT', async (done) => {
		const mockRequest = {
			params: {
				id: uuid()
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
		const mockUpdateNoteDB = jest.spyOn(dbOperations, 'updateNoteDB');
		mockUpdateNoteDB.mockResolvedValue();
		await changeStateOfNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('State changed');
		expect(codeMock).toHaveBeenCalledWith(200);
		mockUpdateNoteDB.mockRestore();
		done();
	});

	it('should return statusCode: 500 note is failed to be updated', async (done) => {
		const mockRequest = {
			params: {
				id: uuid()
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
		const mockUpdateNoteDB = jest.spyOn(dbOperations, 'updateNoteDB');
		mockUpdateNoteDB.mockRejectedValue(new Error ('State change failed'));
		await changeStateOfNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('State change failed');
		expect(codeMock).toHaveBeenCalledWith(500);
		mockUpdateNoteDB.mockRestore();
		done();
	});


});

// const postNotesHandler = async (request, h) => {
// 	try {
// 	  const { sequelize } = request.server;
// 	  const note = request.payload;
// 	  note.id = uuid();
// 	  note.isactive = true;
// 	  await dbOperations.writeDB(sequelize, note);
// 	  return h.response('New Notes added').code(200);
// 	} catch (err) {
// 	  return h.response(err.message).code(500);
// 	}
//   };

// describe('the post handler function', () => {
// 	it('should call h.response with success message when adding new note succeeds', async (done) => {
// 	  const mockRequest = {
// 		payload: {
// 		  title: 'new note',
// 		  description: 'describe note',
// 		},
// 		server:
// 		{
// 		  sequelize: {},
// 		},
// 	  };
// 	  const mockCode = jest.fn();
// 	  const mockH = {
// 		response: jest.fn(() => ({ code: mockCode })),
// 	  };
// 	  const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');
// 	  mockWriteDB.mockResolvedValue();
// 	  await postNotesHandler(mockRequest, mockH);
// 	  expect(mockH.response).toHaveBeenCalledWith('New Notes added');
// 	  expect(mockCode).toHaveBeenCalledWith(200);
// 	  // expect(result).toBe(123);
// 	  mockWriteDB.mockRestore();
// 	  done();
// 	});
// 	it('should call h.response with error message when adding new note fails ', async (done) => {
// 	  const mockRequest = {
// 		payload: {
// 		  title: 'new note',
// 		  description: 'describe note',
// 		},
// 		server:
// 		{
// 		  sequelize: {},
// 		},
// 	  };
// 	  const mockCode = jest.fn();
// 	  const mockH = {
// 		response: jest.fn(() => ({ code: mockCode })),
// 	  };
// 	  const mockInsertNote = jest.spyOn(dbOperations, 'writeDB');
// 	  mockInsertNote.mockRejectedValue(new Error('Failed to add new note'));
// 	  await postNotesHandler(mockRequest, mockH);
// 	  expect(mockH.response).toHaveBeenCalledWith('Failed to add new note');
// 	  expect(mockCode).toHaveBeenCalledWith(500);
// 	  // expect(result).toBe(123);
// 	  mockInsertNote.mockRestore();
// 	  done();
// 	});
//   });

// const route = require('./Routes/noteRoutes');
// const Joi = require('@hapi/joi');
// const connection = require('./connection-plugin');
// const Hapi = require('@hapi/hapi');
// const buildServer = async () => {
//   // eslint-disable-next-line new-cap
//   const server = Hapi.Server({
//     host: 'localhost',
//     port: 3000,
//   });
//   await server.validator(Joi);
//   server.route(route);
//   await server.register(connection);
//   return server;
// };
//module.exports = buildServer;

// //


// const buildServer = require('./src/server');
// const start = async () => {
//   const server = await buildServer();
//   await server.start((err) => {
//     if (err) {
//       throw err;
//     }
//   });
// };
// start();
// console.log('Server started');


//import
