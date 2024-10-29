const jwt = require('jsonwebtoken');

function isAuthToken(req, res, next) {
	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'Access token missing' });
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid or expired token' });
		}
		req.user = user;
		next();
	});
}

module.exports = isAuthToken;
