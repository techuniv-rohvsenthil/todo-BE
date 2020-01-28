const getQuote = require('../../src/handler/quoteHandlers');
const axios = require('axios').default;

describe('the getQuote handlers,', () => {  

	it('should call axios api when /quotes is hit with GET', async (done) => {
		const mockAxios = jest.spyOn(axios, 'get');
		const mockAxiosResponse = {
			data: {
				content: 'quote',
				author: 'author'
			},
		};
		mockAxios.mockResolvedValue(mockAxiosResponse);
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => ({
				code: mockCode
			}))
		};
		await getQuote(null, mockH);
		expect(mockH.response).toHaveBeenCalledWith(`${mockAxiosResponse.data.content} by ${mockAxiosResponse.data.author}`);
		expect(mockCode).toHaveBeenCalledWith(200);
		done();
	});

	it('should return a statusCode: 500 when the api call fails', async () => {
		const mockAxios = jest.spyOn(axios, 'get');
		mockAxios.mockRejectedValue(new Error('API Call failed'));
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => ({ 
				code: mockCode 
			}))
		};
		await getQuote(null, mockH);
		expect(mockCode).toHaveBeenCalledWith(500);
		expect(mockH.response).toHaveBeenCalledWith('API Call failed');
	});

	it('should get statusCode: 204 when api returns empty data', async () => {
		const mockAxios = jest.spyOn(axios, 'get');
		const mockAxiosResponse = {
			data: {}
		};
		mockAxios.mockResolvedValue(mockAxiosResponse);
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => ({ 
				code: mockCode 
			}))
		};
		await getQuote(null, mockH);
		expect(mockCode).toHaveBeenCalledWith(204);
		expect(mockH.response).toHaveBeenCalledWith('No data found');
		mockAxios.mockRestore();
	});


});