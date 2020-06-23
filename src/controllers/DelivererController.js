import Deliverer from '../models/Deliverer';

module.exports = {
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
};
