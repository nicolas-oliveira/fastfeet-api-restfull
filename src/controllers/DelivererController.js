import Deliverer from '../models/Deliverer';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async index(request, response) {
		const { id } = request.params;

		// Get deliverer when route have id param
		if (id) {
			const deliverer = await Deliverer.findOne({ where: { id } });

			if (!deliverer) {
				return response.status(400).json({ error: 'Deliverer not found' });
			}

			return response.json(deliverer);
		}

		// Get all deliverers with pagination
		const { page = 1 } = request.query;

		const deliverers = await Deliverer.findAll({
			attributes: ['id', 'name', 'email', 'avatar_id'],
			limit: 5,
			offset: (page - 1) * 5,
		});

		return response.json(deliverers);
	},

	async store(request, response) {
		try {
			const { name, email } = request.body;

			if (!name) {
				return response.status(400).json({ error: 'Name is required' });
			}

			const delivererExists = await Deliverer.findOne({
				where: { email },
			});

			if (delivererExists) {
				return response.status(400).json({ error: 'Deliverer already exists' });
			}

			const { id } = await Deliverer.create({ name, email });

			return response.json({ id, name, email });
		} catch (err) {
			return response.status(400).json(catchMessages(err));
		}
	},

	async delete(request, response) {
		const delivExists = await Deliverer.findOne({
			where: { id: request.params.id },
		});

		if (!delivExists) {
			return response.status(400).json({ error: 'Deliverer not found' });
		}

		await Deliverer.destroy({ where: { id: request.params.id } });

		return response.status(200).json();
	},

	async update(request, response) {
		try {
			const delivExists = await Deliverer.findOne({
				where: { id: request.params.id },
			});

			if (!delivExists) {
				return response.status(400).json({ error: 'Deliverer not found' });
			}

			await Deliverer.update(request.body, {
				where: {
					id: request.params.id,
				},
			});

			return response.json();
		} catch (err) {
			return response.status(400).json(catchMessages(err));
		}
	},
};
