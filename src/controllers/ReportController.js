import Report from '../models/Report';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async index(request, response) {
		try {
			const { page = 1 } = request.query;

			const deliveries = await Report.findAll({
				attributes: ['id', 'description'],
				limit: 5,
				offset: (page - 1) * 5,
				include: [
					{
						association: 'deliveries',
						where: {
							canceled_at: null,
						},
						attributes: [
							'id',
							'product',
							'start_date',
							'end_date',
							'signature_id',
						],
						include: [
							{
								model: Deliveryman,
								as: 'deliveryman',
								attributes: ['id', 'name', 'email'],
							},
							{
								model: Recipient,
								as: 'recipient',
								attributes: ['id', 'name', 'zip_code', 'country'],
							},
						],
					},
				],
			});

			return response.json(deliveries);
		} catch (err) {
			if (!err.errors) {
				// Only development
				console.log(err);
			}
			return response.json(catchMessages(err));
		}
	},

	async store(request, response) {
		try {
			const { delivery_id, description } = request.body;

			if (!delivery_id) {
				return response.status(400).json({ error: 'delivery_id is required' });
			}

			if (!description) {
				return response.status(400).json({ error: 'description is required' });
			}

			const isDelivery = await Delivery.findByPk(delivery_id);

			if (!isDelivery) {
				return response.status(404).json({ error: 'Cannot found delivery' });
			}

			await Report.create(request.body);

			return response.json({ delivery_id, description });
		} catch (err) {
			if (!err.errors) {
				// Only development
				console.log(err);
			}
			return response.json(catchMessages(err));
		}
	},
};
