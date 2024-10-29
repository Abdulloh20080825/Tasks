const jwttoken = require('../helpers/token');
const User = require('../models/User');
const authService = require('../service/auth.service');
const mailService = require('../service/mail.service');

class AuthController {
	async createAccount(req, res) {
		try {
			const { username, email, password } = req.body;
			if (!username || !email || !password) {
				return res.status(400).json({
					message: 'All fields are required',
					error: true,
				});
			}
			const createUser = await authService.createAccount({
				username,
				email,
				password,
			});
			if (createUser.error) {
				return res.status(400).json({
					message: createUser.message,
					error: true,
				});
			}
			const accessToken = jwttoken({
				_id: createUser.id,
			});
			return res.status(201).json({
				message: 'Account created successfully',
				user: createUser,
				accessToken,
				error: false,
			});
		} catch (error) {
			console.error('Error during account creation:', error);
			return res.status(500).json({
				message: 'Something went wrong. Please try again later.',
				error: true,
			});
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				message: 'Email and password are required',
				error: true,
			});
		}

		try {
			const loginResponse = await authService.login({ email, password });

			if (loginResponse.error) {
				return res.status(401).json({
					message: loginResponse.message,
					error: true,
				});
			}
			return res.status(200).json({
				message: 'Login successful',
				user: loginResponse.user,
				accessToken: loginResponse.token,
				error: false,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later.',
				error: true,
			});
		}
	}
	async getUserInfo(req, res) {
		try {
			const user = await User.findById(req.user._id);
			if (!user) {
				return res.status(404).json({
					message: 'User not found',
					error: true,
				});
			}

			return res.status(200).json({
				message: 'User information retrieved successfully',
				user,
				error: false,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later.',
				error: true,
			});
		}
	}
	async activation(req, res) {
		try {
			const { code } = req.body;
			const user = await User.findById(req.user._id);
			if (!user) {
				return res.status(404).json({
					message: 'User not found',
					error: true,
				});
			}
			if (user.activationCode === code) {
				user.active = true;
				user.activationCode = null;
				await user.save();

				return res.status(200).json({
					message: 'Account successfully activated',
					error: false,
				});
			} else {
				return res.status(400).json({
					message: 'Invalid activation code',
					error: true,
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later.',
				error: true,
			});
		}
	}
}

module.exports = new AuthController();
