import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

module.exports = {
	async index(request, response) {
		const { id } = request.params;
		const deliverymanExists = await Deliveryman.findByPk(id);

		if (!deliverymanExists) {
			return response.status(400).json({ error: 'Deliveryman not found' });
		}

		const deliveries = await Delivery.findAll({
			where: {
				deliveryman_id: id,
				canceled_at: null,
				signature_id: { [Op.not]: null },
				start_date: { [Op.not]: null },
				end_date: { [Op.not]: null },
			},
			order: ['end_date'],
		});

		return response.json(deliveries);
	},
};
