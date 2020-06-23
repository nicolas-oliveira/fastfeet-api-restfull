import jwt from 'jsonwebtoken';

import Adm from '../models/Adm';
import authConfig from '../config/auth';

module.exports = {
	async store(request, response) {
		const { email, password } = request.body;

		const adm = await Adm.findOne({ where: { email } }); // porque duas chaves?

		if (!adm) {
			return response.status(401).json({ error: 'Administrator not found' });
		}
		if (!(await adm.checkPassword(password))) {
			return response.status(401).json({ error: 'Password does not match' });
		}

		const { id } = adm;

		return response.json({
			adm: {
				id,
				email,
			},
			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	},
};
