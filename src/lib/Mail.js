import nodemailer from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
	constructor() {
		const { host, port, secure, auth } = mailConfig;
		this.transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: auth.user ? auth : null,
		});
		this.configureTemplates();
	}

	configureTemplates() {
		const viewsDir = resolve(__dirname, '..', 'views', 'emails');

		this.transporter.use(
			'compile',
			nodemailerhbs({
				viewEngine: handlebars.create({
					layoutsDir: resolve(viewsDir, 'layouts'),
					partialsDir: resolve(viewsDir, 'partials'),
					defaultLayout: 'default',
					extname: '.hbs',
				}),
				viewPath: viewsDir,
				extName: '.hbs',
			})
		);
	}

	sendMail(message) {
		return this.transporter.sendMail({
			...mailConfig.default,
			...message,
		});
	}
}

export default new Mail();
