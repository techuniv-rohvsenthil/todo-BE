const getQuote = require('../../src/handler/quoteHandlers');
const axios = require('axios').default;

describe('the getQuote handlers,', () => {  

	it('should call axios api when /quotes is hit with GET', async (done) => {
		const mockAxios = jest.spyOn(axios, 'get');
		getQuote();
		expect(mockAxios).toHaveBeenCalledWith('http://api.quotable.io/random');
		done();
	});


});