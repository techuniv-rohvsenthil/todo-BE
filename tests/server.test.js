let {init} = require('../src/server');

describe('the server,', () => {  
	
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});

	it('should get all notes when /notes is hit with GET', async (done) => {
		let obj = {
			method: 'GET',
			url: '/notes'
		};
		const res = await server.inject(obj);
		expect(res.statusCode).toBe(200);
		done();
	});

	it('should update the list of notes when /notes is hit with POST', async (done) => {
		let obj = {
			method: 'POST',
			url: '/notes',
			payload: {
				title: 'Note new',
				description: 'Note new description'
			}
		};
		const res = await server.inject(obj);
		expect(res.payload).toBe('Note added');
		expect(res.statusCode).toBe(200);
		done();
	});

	it('should delete expected note when /notes/{id} is hit with DELETE', async (done) => {
		let obj = {
			method: 'DELETE',
			url: '/notes/bvi1it8'
		};
		const res = await server.inject(obj);
		expect(res.payload).toBe('Note deleted');
		expect(res.statusCode).toBe(200);
		done();
	});


});


