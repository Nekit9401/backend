const chalk = require('chalk');
const Complaint = require('./models/Complaint');

async function addComplaint(fullName, phone, problem) {
	const now = new Date();
	const formattedDate = now.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	await Complaint.create({ date: formattedDate, fullName, phone, problem });
	console.log(chalk.bgGreen('Заявка была добавлена!'));
}

async function getComplaints() {
	const complaints = await Complaint.find();

	return complaints;
}

module.exports = {
	addComplaint,
	getComplaints,
};
