import jwt from 'jsonwebtoken';

import Adm from '../models/Adm';
import authConfig from '../config/auth';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async store(request, response) {
		try {
			const { email, password } = request.body;

			const adm = await Adm.findOne({ where: { email } });

			if (!adm) {
				return response.status(401).json({ error: 'Administrator not found' });
			}
			if (!(await adm.checkPassword(password))) {
				return response.status(401).json({ error: 'Password does not match' });
			}

			const { id } = adm;
			const token = jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			});
			console.log(`\n\n${token}\n\n`);
			return response.json({
				adm: {
					id,
					email,
				},
				token,
			});
		} catch (err) {
			if (!err.errors) {
				// Apenas desenvolvimento
				console.log(err);
			}
			return response.json(catchMessages(err));
		}
	},
};
