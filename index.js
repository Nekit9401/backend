const express = require('express');
const chalk = require('chalk');
const path = require('path');
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
	});
});

app.post('/', async (req, res) => {
	console.log(req.body);
	await addNote(req.body.title);
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: true,
	});
});

app.delete('/:id', async (req, res) => {
	await deleteNote(req.params.id);

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.put('/:id', async (req, res) => {
	await updateNote(req.params.id, req.body.title);

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.listen(port, () => {
	console.log(chalk.green(`Server has been started on port ${port}...`));
});
