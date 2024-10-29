const nodemailer = require('nodemailer');

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	async sendMail(email, code) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `Activation account code`,
			html: `
				<div>
				<br/>
					<h1>Account activation code</h1><br/>
					<b>Your code: ${code}</b>
				</div>
			`,
		});
	}
}

module.exports = new MailService();
