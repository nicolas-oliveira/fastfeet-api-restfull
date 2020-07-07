import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import catchMessages from '../utils/catchMessages';
// import Mail from '../lib/Mail';

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;
		const deliveries = await Delivery.findAll({
			limit: 10,
			offset: (page - 1) * 10,
			attributes: [
				'id',
				'product',
				'deliveryman_id',
				'recipient_id',
				'signature_id',
				'canceled_at',
				'start_date',
				'end_date',
			],
		});
		return response.status(200).json(deliveries);
	},

	async store(request, response) {
		try {
			const { recipient_id, deliveryman_id, product } = request.body;

			if (!recipient_id) {
				return response
					.status(400)
					.json({ errors: ['Recipient_id is required'] });
			}

			if (!deliveryman_id) {
				return response
					.status(400)
					.json({ errors: ['Deliveryman_id is required'] });
			}

			if (!product) {
				return response
					.status(400)
					.json({ errors: ['Product name is required'] });
			}

			const recipientExists = await Recipient.findByPk(recipient_id);

			if (!recipientExists) {
				return response.status(400).json({ error: 'Recipient ID not found' });
			}

			const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

			if (!deliverymanExists) {
				return response.status(400).json({ error: 'Deliveryman ID not found' });
			}

			await Delivery.create({ recipient_id, deliveryman_id, product });

			// await Mail.sendMail({
			// 	to: `${deliverymanExists.name} <${deliverymanExists.email}>`,
			// 	subject: 'Nova entrega',
			// 	text: 'Foi verificado que há uma nova entrega',
			// });

			return response
				.status(200)
				.json({ recipient_id, deliveryman_id, product });
		} catch (err) {
			// if (!err.errors) {
			// 	// Apenas desenvolvimento
			// 	console.log(err);
			// }
			return response.status(400).json(catchMessages(err));
		}
	},

	async update(request, response) {
		const { id } = request.params;

		const idExists = await Delivery.findOne({ where: { id } });

		if (!idExists) {
			return response.status(400).json({ error: 'Cannot find Delivery ID' });
		}

		const { recipient_id, deliveryman_id } = request.body;

		const recipientExists = await Recipient.findByPk(recipient_id);

		if (!recipientExists) {
			return response.status(400).json({ error: 'Recipient ID not found' });
		}

		const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

		if (!deliverymanExists) {
			return response.status(400).json({ error: 'Deliveryman ID not found' });
		}

		await Delivery.update(request.body, { where: { id } });

		return response.json();
	},

	async delete(request, response) {
		const { id } = request.params;

		const deliveryExists = await Delivery.findOne({ where: { id } });

		if (!deliveryExists) {
			return response.status(400).json({ error: 'Cannor find Delivery ID' });
		}

		await Delivery.destroy({ where: { id } });

		return response.json();
	},
};
