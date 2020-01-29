const sequelize = require('../../src/dbConnection');
const dbOperations = require('../../src/utils/dbOperations');
const uuid = require('uuid');


describe('the selectNotesDB function,', () => {
	it('should return an array', async () => {
		const notes = await dbOperations.selectNotesDB();
		expect(notes).toBeInstanceOf(Array);
		sequelize.close();
	});

	it('should call return result of sequelize.query', async () => {
		const mockSequelize = jest.spyOn(sequelize, 'query');
		const mockSequelizeResponse = [{
			title: 'Note 1',
			description: 'Note 1 description',
			noteid: uuid(),
			isactive: true
		}];
		mockSequelize.mockResolvedValue(mockSequelizeResponse);
		const notes = await dbOperations.selectNotesDB();
		expect(mockSequelize).toHaveBeenCalled();
		expect(notes).toBe(mockSequelizeResponse);
		mockSequelize.mockRestore();
		sequelize.close();
	});
    
});

describe('the insertNotesDB function,', () => {

	it('should call sequelize.query to insert the new note', async () => {
		const mockSequelize = jest.spyOn(sequelize, 'query');
		mockSequelize.mockResolvedValue();
		const mockValues = {
			title: 'New note',
			description: 'New note description'
		};
		await dbOperations.insertNoteDB(mockValues);
		expect(mockSequelize).toHaveBeenCalled();
		mockSequelize.mockRestore();
		sequelize.close();
	});
    
});
