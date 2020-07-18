import Deliveryman from '../models/Deliveryman';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async index(request, response) {
		const { id } = request.params;

		// Get deliveryman when route have id param
		if (id) {
			const deliveryman = await Deliveryman.findByPk(id);

			if (!deliveryman) {
				return response.status(400).json({ error: 'Deliveryman not found' });
			}

			return response.json(deliveryman);
		}

		// Get all deliverymans with pagination
		const { page = 1 } = request.query;

		const deliverymans = await Deliveryman.findAll({
			attributes: ['id', 'name', 'email', 'avatar_id'],
			limit: 5,
			offset: (page - 1) * 5,
		});

		return response.json(deliverymans);
	},

	async store(request, response) {
		try {
			const { name, email } = request.body;

			if (!name) {
				return response.status(400).json({ error: 'Name is required' });
			}

			const deliverymanExists = await Deliveryman.findOne({
				where: { email },
			});

			if (deliverymanExists) {
				return response
					.status(400)
					.json({ error: 'deliveryman already exists' });
			}

			const { id } = await Deliveryman.create({ name, email });

			return response.json({ id, name, email });
		} catch (err) {
			return response.status(400).json(catchMessages(err));
		}
	},

	async delete(request, response) {
		const delivExists = await Deliveryman.findOne({
			where: { id: request.params.id },
		});

		if (!delivExists) {
			return response.status(400).json({ error: 'deliveryman not found' });
		}

		await Deliveryman.destroy({ where: { id: request.params.id } });

		return response.status(200).json();
	},

	async update(request, response) {
		try {
			const delivExists = await Deliveryman.findOne({
				where: { id: request.params.id },
			});

			if (!delivExists) {
				return response.status(400).json({ error: 'deliveryman not found' });
			}

			await Deliveryman.update(request.body, {
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
