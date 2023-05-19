const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			default: 'user',
		},
		contactNumber: {
			type: String,
			required: true,
            default: '0000000000',
		},
		address: {
			type: String,
			required: true,
            default: 'No. 0, Street, City, Country',
		},
		email: {
			type: String,
			required: true,
            unique: true,	
		},
		password: {
			type: String,
			required: true,
		},
		businessName: {
			type: String,
			required: false,
		},
		website: {
			type: String,
			required: false,
		},
		regDate: {
			type: String,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
