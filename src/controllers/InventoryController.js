import { startOfHour, parseISO, isBefore, isDate } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async index(request, response) {
		const { id } = request.params;
		const { page = 1 } = request.headers;
		const deliverymanExists = await Deliveryman.findByPk(id);

		if (!deliverymanExists) {
			return response.status(400).json({ error: 'Deliveryman not found' });
		}
		const deliveriesOfDeliveryman = await Delivery.findAll({
			where: { deliveryman_id: id, canceled_at: null },
			attributes: ['id', 'product', 'signature_id', 'start_date', 'end_date'],
			limit: 5,
			offset: (page - 1) * 5,
			include: [
				{
					model: Recipient,
					as: 'recipient',
					attributes: [
						'name',
						'number',
						'street',
						'city',
						'state',
						'zip_code',
						'country',
					],
				},
			],
		});

		return response.json(deliveriesOfDeliveryman);
	},

	async update(request, response) {
		try {
			const { id: deliveryman_id } = request.params;
			const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

			if (!deliverymanExists) {
				return response.status(400).json({ error: 'Deliveryman not found' });
			}

			const { id, start_date, end_date } = request.body;

			if (!id) {
				return response.status(400).json({ error: 'Id is required' });
			}

			await Delivery.update(request.body, { where: { id } });

			return response.json({ start_date, end_date });
		} catch (err) {
			if (!err.errors) {
				// Apenas desenvolvimento
				console.log(err);
			}
			return response.status(400).json(catchMessages(err));
		}
	},
};
