const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Некорректный Email',
		},
	},
	password: {
		type: String,
		required: true,
		minLength: [6, 'Пароль должен содержать минимум 6 символов'],
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
