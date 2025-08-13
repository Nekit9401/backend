const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	};

	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.bgGreen('Note was added!'));
}

async function deleteNote(id) {
	const notes = await getNotes();

	const filteredNotes = notes.filter((note) => note.id !== id);

	await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
	console.log(chalk.bgGreen('Note was deleted!'));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function updateNote(id, newTitle) {
	const notes = await getNotes();

	const updatedNotes = notes.map((note) => (note.id === id ? { ...note, title: newTitle } : note));

	await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
	console.log(chalk.bgYellow('Note was been updated!'));
}

async function printNotes() {
	const notes = await getNotes();

	console.log(chalk.bgBlue('Это весь список заметок!'));
	notes.forEach((note) => {
		console.log(chalk.green(note.id), chalk.blue(note.title));
	});
}

module.exports = {
	addNote,
	printNotes,
	deleteNote,
	getNotes,
	updateNote,
};
