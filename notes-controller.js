const chalk = require('chalk');
const Note = require('./models/Note');

async function addNote(title) {
	await Note.create({ title });
	console.log(chalk.bgGreen('Note was added!'));
}

async function deleteNote(id) {
	await Note.deleteOne({ _id: id });
	console.log(chalk.bgRed(`Note with id:${id} was deleted!`));
}

async function getNotes() {
	const notes = await Note.find();

	return notes;
}

async function updateNote(id, newTitle) {
	await Note.updateOne({ _id: id }, { title: newTitle });
	console.log(chalk.bgYellow(`Note with id:${id} was been updated!`));
}

module.exports = {
	addNote,
	deleteNote,
	getNotes,
	updateNote,
};
