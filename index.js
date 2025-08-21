const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { addComplaint, getComplaints } = require('./complaints-controller');
const { loginUser } = require('./user-controller');
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
		title: 'Жалобы Онлайн',
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
			title: 'Жалобы Онлайн',
			error: error.message,
		});
	}
});

app.get('/form', async (req, res) => {
	res.render('form', {
		title: 'Жалобы Онлайн',
		error: undefined,
		created: false,
	});
});

app.post('/form', async (req, res) => {
	try {
		res.render('form', {
			title: 'Жалобы Онлайн',
			created: true,
			error: undefined,
			isButtonDisabled: true,
		});

		await addComplaint(req.body.fullName, req.body.phone, req.body.problem);

		res.render('form', {
			title: 'Жалобы Онлайн',
			created: true,
			error: undefined,
		});
	} catch (error) {
		res.render('form', {
			title: 'Жалобы Онлайн',
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
		title: 'Список заявок',
		complaints: await getComplaints(),
		userEmail: req.user.email,
		created: false,
		error: false,
	});
});

mongoose
	.connect(
		'mongodb+srv://Nekit9401:KCYfA1vriOJ98h4G@cluster0.6ikts9r.mongodb.net/complaints?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`));
		});
	});
