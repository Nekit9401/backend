require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { addNote, getNotes, deleteNote, updateNote } = require('./notes-controller');
const { addUser, loginUser } = require('./user-controller');
const auth = require('./middlewares/auth');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/login', async (req, res) => {
	res.render('login', {
		title: 'Express App',
		error: undefined,
	});
});

app.post('/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true });

		res.redirect('/');
	} catch (error) {
		res.render('login', {
			title: 'Express App',
			error: error.message,
		});
	}
});

app.get('/register', async (req, res) => {
	res.render('register', {
		title: 'Express App',
		error: undefined,
	});
});

app.post('/register', async (req, res) => {
	try {
		await addUser(req.body.email, req.body.password);

		res.redirect('/login');
	} catch (error) {
		if (error.code === 11000) {
			res.render('register', {
				title: 'Express App',
				error: 'Такой Email уже зарегистрирован',
			});
			return;
		}
		res.render('register', {
			title: 'Express App',
			error: error.message,
		});
	}
});

app.get('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true });

	res.redirect('/login');
});

app.use(auth);

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		userEmail: req.user.email,
		created: false,
		error: false,
	});
});

app.post('/', async (req, res) => {
	try {
		console.log(req.body, req.user.email);
		await addNote(req.body.title, req.user.email);
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: true,
			error: false,
		});
	} catch (error) {
		console.error('Creation error', error);
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: true,
		});
	}
});

app.delete('/:id', async (req, res) => {
	try {
		await deleteNote(req.params.id, req.user.email);

		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: false,
		});
	} catch (error) {
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: error.message,
		});
	}
});

app.put('/:id', async (req, res) => {
	try {
		await updateNote(req.params.id, req.body.title, req.user.email);

		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: false,
		});
	} catch (error) {
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: error.message,
		});
	}
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(chalk.green(`Server has been started on port ${port}...`));
	});
});
