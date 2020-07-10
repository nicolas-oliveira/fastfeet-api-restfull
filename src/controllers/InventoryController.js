import {
	parseISO,
	getTime,
	setSeconds,
	setHours,
	setMinutes,
	isBefore,
	isAfter,
	format,
} from 'date-fns';
import { Op } from 'sequelize';
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
			const isFinished = await Delivery.findOne({
				where: {
					id,
					start_date: { [Op.not]: null },
					end_date: { [Op.not]: null },
				},
			});

			if (!isFinished) {
				return response
					.status(401)
					.json({ error: 'This delivery is already finished' });
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

			// Verify if start_date is null when user tries to fill end_date
			if (!start_date) {
				const startAt = await Delivery.findOne({
					where: { id, start_date: { [Op.not]: null } },
				});

				if (!startAt) {
					return response
						.status(401)
						.json({ error: "You can't finish deliveries without init it" });
				}
			}

			const hours = ['08:00', '18:00'];

			// Get the current date and transform in Timestamp for query builder
			const date = start_date
				? getTime(parseISO(start_date))
				: getTime(parseISO(end_date));

			const [start_day, end_day] = hours.map((time) => {
				const [hour, minute] = time.split(':');
				const timeFormatted = setSeconds(
					setMinutes(setHours(date, hour), minute),
					0
				);
				return timeFormatted;
			});

			if (!(isAfter(date, start_day) && isBefore(date, end_day))) {
				return response.status(401).json({
					error: 'You can only recall deliveries between 08:00 and 18:00',
				});
			}

			// Verify if deliveryman recalled delivery 5 times
			const timesRecall = await Delivery.findAll({
				where: {
					deliveryman_id,
					start_date: { [Op.between]: [start_day, end_day] },
				},
			});

			await Delivery.update(request.body, { where: { id } });

			return response.json({
				date,
				dateISO: format(date, "yyyy-MM-dd'T'HH:mm:ssxxx"),
				start_day,
				end_day,
				between8and18: isAfter(date, start_day) && isBefore(date, end_day),
			});
		} catch (err) {
			if (!err.errors) {
				// Only development
				console.log(err);
			}
			return response.status(400).json(catchMessages(err));
		}
	},
};
