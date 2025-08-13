const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const { addNote, getNotes, deleteNote, updateNote } = require('./notes-controller');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	});
});

app.post('/', async (req, res) => {
	try {
		console.log(req.body);
		await addNote(req.body.title);
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: true,
			error: false,
		});
	} catch (error) {
		console.error('Creation error', error);
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: false,
			error: true,
		});
	}
});

app.delete('/:id', async (req, res) => {
	await deleteNote(req.params.id);

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	});
});

app.put('/:id', async (req, res) => {
	await updateNote(req.params.id, req.body.title);

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	});
});

mongoose
	.connect(
		'mongodb+srv://Nekit9401:KCYfA1vriOJ98h4G@cluster0.6ikts9r.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`));
		});
	});
