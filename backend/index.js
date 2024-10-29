require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3030;
const app = express();
const AuthRoutes = require('./routes/auth.router');
const TasksRoutes = require('./routes/task.router');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

app.use(
	cors({
		origin: '*',
	})
);

// Sayt ishalavotimi yoqmi tekshirish
app.get('/', (req, res) => {
	try {
		res.send('Backend correctly working');
	} catch (error) {
		throw new Error('Backend error');
	}
});
// Middlewarelar
app.use(express.json());
app.use(AuthRoutes);
app.use(TasksRoutes);

// Saytni qaysidur portda ishga tushurish
app.listen(PORT, () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log('Data Base connected');
		})
		.catch((error) => {
			console.error('Data Base error', error);
		});
	console.log(`Server has been started on PORT: ${PORT}`);
});
