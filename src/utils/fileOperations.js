const fs = require('promise-fs');

const readFromNotes = async (filepath) => {
	let data = await fs.readFile(filepath, 'utf-8');
	let parsedNotes = JSON.parse(data);
	return parsedNotes; 
};

const writeToNotes = async (filepath, data) => {
	await fs.writeFile(filepath, data, 'utf-8');
};

module.exports = {readFromNotes, writeToNotes};


