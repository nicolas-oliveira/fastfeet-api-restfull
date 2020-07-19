import { format } from 'date-fns';
import { Op } from 'sequelize';
import Report from '../models/Report';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';
import Mail from '../lib/Mail';

module.exports = {
	async index(request, response) {
		const { id } = request.params;

		if (!id) {
			return response.status(400).json({ error: 'Id is required' });
		}

		const delivery = await Report.findAll({
			where: { delivery_id: id },
			attributes: ['id', 'description'],
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

		if (!delivery) {
			return response.status(400).json({ error: 'Cannot find Delivery id' });
		}

		return response.json(delivery);
	},

	async delete(request, response) {
		const { id } = request.params;

		if (!id) {
			return response.status(400).json({ error: 'Id is required' });
		}

		const hasReport = await Report.findOne({
			where: { delivery_id: id },
			include: [
				{
					association: 'deliveries',
					include: [
						{
							association: 'deliveryman',
						},
						{
							association: 'recipient',
						},
					],
				},
			],
		});

		if (!hasReport) {
			return response
				.status(401)
				.json({ error: 'This delivery cannot be canceled without a report' });
		}

		const canceled = await Delivery.findOne({
			where: {
				[Op.or]: [
					{ id, canceled_at: { [Op.not]: null } },
					{ id, start_date: { [Op.not]: null }, end_date: { [Op.not]: null } },
				],
			},
		});

		if (canceled) {
			return response
				.status(400)
				.json({ error: 'This delivery is already canceled or finish' });
		}

		const date = Number(Date.now());
		const iso = format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
		const emailDate = format(date, "yyyy-MM-dd à's' HH:mm:ss");
		// console.log(`\n${date}\n${iso}\n`);

		const { description, deliveries } = hasReport;
		const { deliveryman, product, recipient } = deliveries;
		const { name, email } = deliveryman;
		const { street, number, zip_code, state, country } = recipient;

		await Delivery.update({ canceled_at: iso }, { where: { id } });

		await Mail.sendMail({
			to: `${name} <${email}>`,
			subject: 'Novo Cancelamento',
			template: 'canceldelivery',
			context: {
				name,
				description,
				product,
				date: emailDate,
				street,
				number,
				zip_code,
				state,
				country,
			},
		});

		return response.json(hasReport);
	},
};
