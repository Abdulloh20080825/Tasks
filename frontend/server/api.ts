import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:9090',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(con) => {
		const token = localStorage.getItem('token');
		if (token) con.headers.Authorization = `Bearer ${token}`;

		return con;
	},
	(err) => {
		return console.log('Error with server', err);
	}
);
