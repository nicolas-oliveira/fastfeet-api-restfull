import Deliverer from '../models/Deliverer';

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;

		const deliverers = await Deliverer.findAll({
			attributes: ['id', 'name', 'email', 'avatar_id'],
			limit: 5,
			offset: (page - 1) * 5,
		});

		return response.json(deliverers);
	},

	async store(request, response) {
		const delivererExists = await Deliverer.findOne({
			where: { email: request.body.email },
		});

		if (delivererExists) {
			return response.status(400).json({ erro: 'Deliverer already exists' });
		}

		const { name, email } = request.body;

		const { id } = await Deliverer.create({ name, email });

		return response.json({ id, name, email });
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
		const { id, name, email, updated_at } = await Deliverer.update(
			request.body
		);

		return response.json({ id, name, email, updated_at });
	},
};
