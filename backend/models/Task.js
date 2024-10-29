const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Task = new Schema(
	{
		title: { type: String, required: true },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
		year: { type: String },
		week: { type: String },
		status: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', Task);
