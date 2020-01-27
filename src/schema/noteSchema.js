const Joi = require('@hapi/joi');

const postNoteSchema = Joi.object(
	{
		title: Joi.string().required(),
		description: Joi.string().required()
	});
    
const deleteNoteSchema = Joi.object(
	{
		params: {
			id: Joi.string().required()}
	});
    
module.exports = {postNoteSchema, deleteNoteSchema};