const mongoose = require('mongoose');

const ComplaintSchema = mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	problem: {
		type: String,
		required: true,
	},
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
