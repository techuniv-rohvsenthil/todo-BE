const fs = require('promise-fs');

const readFromNotes = async (filepath) => {
	let data = await fs.readFile(filepath, 'utf-8');
	return data; 
};

const writeToNotes = async (filepath, data) => {
	await fs.writeFile(filepath, data, 'utf-8');
};

module.exports = {readFromNotes, writeToNotes};


