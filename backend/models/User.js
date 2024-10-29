const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
	{
		username: { type: String, require: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true },
		active: { type: Boolean, default: false },
		activationCode: { type: String },
		specialDays: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', User);
