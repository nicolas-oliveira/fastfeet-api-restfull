import Recipient from '../models/Recipient';
import catchMessages from '../utils/catchMessages';

module.exports = {
	async store(request, response) {
		try {
			const { zip_code } = request.body;

			if (!zip_code) {
				return response.status(400).json({ error: 'Zip_code is required' });
			}

			const adressExists = await Recipient.findOne({
				where: { zip_code },
			});

			if (adressExists) {
				return response.status(400).json({ error: 'Adress already exists.' });
			}

			const { adm_id } = request;

			const { name, number, street, city, state, country } = request.body;

			const adress = await Recipient.create({
				name,
				number,
				street,
				city,
				state,
				country,
				zip_code,
				adm_id,
			});

			return response.json(adress);
		} catch (err) {
			return response.status(400).json(catchMessages(err));
		}
	},

	async update(request, response) {
		try {
			const { id } = request.params;

			const recipient = await Recipient.findOne({ where: { id } });

			if (!recipient) {
				return response.status(400).json({ error: 'Recipient not found' });
			}

			const adress = await recipient.update(request.body);

			return response.json({ adress });
		} catch (err) {
			// if (!err.errors) {
			// 	// Only development
			// 	console.log(err);
			// }
			return response.status(400).json(catchMessages(err));
		}
	},

	async delete(request, response) {
		const { id } = request.params;

		const isRecipient = await Recipient.findByPk(id);
		if (!isRecipient) {
			return response.status(400).json({ error: 'Recipient not found' });
		}
		await Recipient.destroy({ where: { id } });

		return response.json();
	},
};
