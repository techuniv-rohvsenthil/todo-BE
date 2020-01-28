const axios = require('axios').default;

const getQuote = async (response, h) => {
	const quotesData = await axios.get('http://api.quotable.io/random');
	const quotes = quotesData.data.content;
	return h.response(quotes);

};

module.exports = getQuote;