const jwt = require('jsonwebtoken');

const jwttoken = (user) => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = jwttoken;
