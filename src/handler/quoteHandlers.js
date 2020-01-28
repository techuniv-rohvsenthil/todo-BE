const axios = require('axios').default;

const getQuote = async (response, h) => {
	try{
		const quote = await axios.get('http://api.quotable.io/random');
		const quoteData = quote.data;
		if(!quoteData || (!quoteData.content) || (!quoteData.author)) {
			return h.response('No data found').code(204);
		}
		return h.response(`${quoteData.content} by ${quoteData.author}`).code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

module.exports = getQuote;