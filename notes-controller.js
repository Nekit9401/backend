const chalk = require('chalk');
const Note = require('./models/Note');

async function addNote(title, owner) {
	await Note.create({ title, owner });
	console.log(chalk.bgGreen('Note was added!'));
}

async function getNotes() {
	const notes = await Note.find();

	return notes;
}

async function deleteNote(id, owner) {
	const result = await Note.deleteOne({ _id: id, owner });

	if (result.matchedCount === 0) {
		throw new Error('Нет заметок для удаления');
	}

	console.log(chalk.bgRed(`Note with id:${id} was deleted!`));
}

async function updateNote(id, newTitle, owner) {
	const result = await Note.updateOne({ _id: id, owner }, { title: newTitle });

	if (result.matchedCount === 0) {
		throw new Error('Нет заметок для редактирования');
	}

	console.log(chalk.bgYellow(`Note with id:${id} was been updated!`));
}

module.exports = {
	addNote,
	deleteNote,
	getNotes,
	updateNote,
};
