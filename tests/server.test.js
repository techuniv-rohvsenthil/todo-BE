let {init} = require('../src/server');


describe('the server,', () => {  
	
	let server;

	beforeEach(async () => {
		//erver = await buildServer()
		//await server.initialize()
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});

	it('should recieve statusCode:200 when /notes is hit with GET', async (done) => {
		let obj = {
			method: 'GET',
			url: '/notes'
		};
		const res = await server.inject(obj);
		expect(res.statusCode).toBe(200);
		done();
	});

	it('should recieve statusCode:200 when /notes is hit with POST', async (done) => {
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

	it('should recieve statusCode:200 when /notes/{id} is hit with DELETE', async (done) => {
		let obj = {
			method: 'DELETE',
			url: '/notes/ef0a2d1f-a1c3-4ef9-93b5-851a3ccf250f'
		};
		const res = await server.inject(obj);
		expect(res.payload).toBe('Note deleted');
		expect(res.statusCode).toBe(200);
		done();
	});

	it('should recieve statusCode:200 when /quotes is hit with GET', async (done) =>{
		const injectOptions = {
			method: 'GET',
			url: '/quotes',
		};
		const response = await server.inject(injectOptions);
		expect(response.statusCode).toEqual(200);
		done();
	});

	it('should recieve statusCode:200 when /notes/{id} is hit with PUT', async (done) =>{
		const injectOptions = {
			method: 'PUT',
			url: '/notes/ef0a2d1f-a1c3-4ef9-93b5-851a3ccf250f',
		};
		const response = await server.inject(injectOptions);
		expect(response.statusCode).toEqual(200);
		done();
	});


});

// it ('The route GET /notes should return a statusCode 200', async () => {
// 	const options = {
// 		method: 'GET',
// 		url: '/notes',
// 	};
// 	const mockPostNotes = jest.spyOn(dbUtils, 'get');
// 	mockPostNotes.mockResolvedValue('{"title":"task1"}');
// 	const response = await server.inject(options);
// 	expect(response.statusCode).toBe(200);
// });


