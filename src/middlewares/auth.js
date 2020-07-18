import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

export default async (request, response, next) => {
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			return response.status(401).json({ error: 'Token not provided' });
		}

		const [, token] = authHeader.split(' '); // ??

		const decoded = await promisify(jwt.verify)(token, authConfig.secret); // ??

		request.adm_id = decoded.id;

		return next();
	} catch (err) {
		// console.log(err);
		return response.status(401).json({ error: 'Token invalid' });
	}
};
