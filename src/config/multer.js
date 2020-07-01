import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

module.exports = {
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
		filename: (request, file, callback) => {
			crypto.randomBytes(8, (err, response) => {
				if (err) return callback(err);
				return callback(
					null,
					response.toString('hex') + extname(file.originalname)
				);
			});
		},
	}),
};
