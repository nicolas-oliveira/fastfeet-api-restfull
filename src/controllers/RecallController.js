import { parseISO, getTime, isBefore, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import catchMessages from '../utils/catchMessages';
import getWorkday from '../utils/getWorkday';

module.exports = {
	async index(request, response) {
		const { id } = request.params;
		const { page = 1 } = request.headers;
		const deliverymanExists = await Deliveryman.findByPk(id);

		if (!deliverymanExists) {
			return response.status(400).json({ error: 'Deliveryman not found' });
		}

		const deliveriesOfDeliveryman = await Delivery.findAll({
			where: {
				deliveryman_id: id,
				canceled_at: null,
				end_date: null,
			},
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

			const { id, start_date } = request.body;

			if (!id) {
				return response.status(400).json({ error: 'Id is required' });
			}

			// Verify if only both are null
			if (!start_date) {
				return response.status(401).json({ error: 'Start_date is required' });
			}

			// Verify if has some unauthorized access in param
			const sameDeliveryman = await Delivery.findOne({
				where: {
					id,
					deliveryman_id,
				},
			});

			if (!sameDeliveryman) {
				return response
					.status(401)
					.json({ error: 'You do not have acess to this delivery' });
			}

			// Verify if delivery is already canceled
			const canceled = await Delivery.findOne({
				where: { id, canceled_at: { [Op.not]: null } },
			});

			if (canceled) {
				return response
					.status(401)
					.json({ error: 'This delivery is canceled' });
			}

			// Verify if delivery is already finish
			const isFinished = await Delivery.findOne({
				where: {
					id,
					start_date: { [Op.not]: null },
					end_date: { [Op.not]: null },
				},
			});

			if (isFinished) {
				return response
					.status(401)
					.json({ error: 'This delivery is already finished' });
			}

			// Get the current date and transform in Timestamp for query builder
			const date = getTime(parseISO(start_date));

			// Return error if date field in request is wrong
			if (!date) {
				return response.status(400).json({ error: 'Incorrect field for date' });
			}

			// Format date hours array
			const [start_day, end_day] = getWorkday(date);

			if (!(isAfter(date, start_day) && isBefore(date, end_day))) {
				return response.status(401).json({
					error: 'You can only change deliveries between 08:00 and 18:00',
				});
			}

			// Verify if deliveryman recalled delivery 5 times at day
			const timesRecall = await Delivery.findAll({
				where: {
					deliveryman_id,
					start_date: { [Op.between]: [start_day, end_day] },
					canceled_at: null,
				},
			});

			if (timesRecall.length + 1 > 5) {
				return response
					.status(401)
					.json({ error: 'You have reached the limit of 5 recalls' });
			}

			await Delivery.update(request.body, { where: { id } });

			return response.json();
		} catch (err) {
			if (!err.errors) {
				// Only development
				console.log(err);
			}
			return response.status(400).json(catchMessages(err));
		}
	},
};
