const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailService = require('./mail.service');
const generateRandomCode = require('../helpers/code');

class AuthService {
	async createAccount(user) {
		try {
			const $user = await User.findOne({ email: user.email });
			if ($user) {
				return {
					message: 'Email is already taken',
					error: true,
				};
			}
			const activationCode = generateRandomCode();
			await mailService.sendMail(user.email, activationCode);

			const hashedPassword = await bcrypt.hash(user.password, 10);
			const newUser = new User({
				username: user.username,
				email: user.email,
				password: hashedPassword,
				active: false,
				activationCode,
			});

			await newUser.save();
			return newUser;
		} catch (error) {
			return {
				message: 'Error creating account',
				error: true,
			};
		}
	}

	async login({ email, password }) {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return {
					message: 'User not found',
					error: true,
				};
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return {
					message: 'Invalid password',
					error: true,
				};
			}

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '1h',
			});

			return {
				message: 'Login successful',
				user,
				token,
				error: false,
			};
		} catch (error) {
			return {
				message: 'Error during login',
				error: true,
			};
		}
	}
}

module.exports = new AuthService();
