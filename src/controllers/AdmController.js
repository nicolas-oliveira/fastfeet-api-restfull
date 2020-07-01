import Adm from '../models/Adm';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async store(request, response) {
		try {
			const { name, email, password } = request.body;

			if (!password) {
				return response.status(400).json({ error: 'Password is required' });
			}

			const admExists = await Adm.findOne({
				where: { email },
			});

			if (admExists) {
				return response
					.status(400)
					.json({ error: 'Administrator already exists.' });
			}

			const { id } = await Adm.create({ name, email, password });

			return response.json({ id, name, email });
		} catch (err) {
			return response.status(400).json(catchMessages(err));
		}
	},

	async update(request, response) {
		try {
			const { email, password, oldPassword } = request.body;

			const adm = await Adm.findByPk(request.adm_id);

			if (!oldPassword) {
				return response.status(400).json({ error: 'Password is required' });
			}

			if (!(await adm.checkPassword(oldPassword))) {
				return response.status(401).json({ error: 'Wrong password' });
			}

			if (email) {
				if (email !== adm.email) {
					const admExists = await Adm.findOne({ where: { email } });

					if (admExists) {
						return response
							.status(400)
							.json({ error: 'Administrator already exists.' });
					}
				}
			}

			if (password && !(await adm.checkPassword(oldPassword))) {
				return response.status(401).json({ error: 'Password does not match' });
			}

			const { id, name } = await adm.update(request.body);

			if (password) {
				return response.json({ id, name, email, status: 'Password changed' });
			}

			return response.json({ id, name, email });
		} catch (err) {
			return response.status(400).json(catchMessages(err));
		}
	},
};
