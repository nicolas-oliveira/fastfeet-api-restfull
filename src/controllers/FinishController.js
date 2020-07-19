import { parseISO, getTime, isBefore, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';
import catchMessages from '../utils/catchMessages';
import getWorkday from '../utils/getWorkday';

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

	async update(request, response) {
		try {
			if (!request.body.id) {
				return response.status(400).json({ error: 'Id is required' });
			}

			const foundId = await Delivery.findByPk(request.body.id);

			if (!foundId) {
				return response.status(404).json({ error: 'Cannot found delivery' });
			}

			// Verify if delivery is already canceled
			const canceled = await Delivery.findOne({
				where: { id: request.body.id, canceled_at: { [Op.not]: null } },
			});

			if (canceled) {
				return response
					.status(401)
					.json({ error: 'This delivery is canceled' });
			}

			// Verify if delivery is already finish
			const isFinished = await Delivery.findOne({
				where: {
					id: request.body.id,
					start_date: { [Op.not]: null },
					end_date: { [Op.not]: null },
				},
			});

			if (isFinished) {
				return response
					.status(401)
					.json({ error: 'This delivery is already finished' });
			}

			const { id, end_date } = request.body;

			if (!end_date) {
				return response.status(401).json({ error: 'End_date is required' });
			}

			if (!request.file) {
				return response.status(401).json({ error: 'File is required' });
			}

			// Get the current date and transform in Timestamp for query builder
			const date = getTime(parseISO(end_date));

			// Return error if date field in request is wrong
			if (!date) {
				return response.status(400).json({ error: 'Incorrect field for date' });
			}

			const startAt = await Delivery.findOne({
				where: { id, start_date: { [Op.not]: null } },
			});

			if (!startAt) {
				return response
					.status(401)
					.json({ error: "You can't finish deliveries without recall it" });
			}

			// Format date hours array
			const [start_day, end_day] = getWorkday(date);

			if (!(isAfter(date, start_day) && isBefore(date, end_day))) {
				return response.status(401).json({
					error: 'You can only change deliveries between 08:00 and 18:00',
				});
			}

			const { originalname: name, filename: path } = request.file;

			const { id: signature_id, url } = await File.create({
				name,
				path,
			});
			await Delivery.update({ signature_id, end_date }, { where: { id } });

			return response.json({ signature_id, url });
		} catch (err) {
			// if (!err.errors) {
			// 	// Only development
			// 	console.log(err);
			// }
			return response.json(catchMessages(err));
		}
	},
};
