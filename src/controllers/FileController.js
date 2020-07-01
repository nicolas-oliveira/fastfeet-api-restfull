import File from '../models/File';
import Deliverer from '../models/Deliverer';

module.exports = {
	async store(request, response) {
		const deliverExists = await Deliverer.findOne({
			where: { id: request.params.id },
		});

		if (!deliverExists) {
			return response.status(400).json({ error: 'ID Provider not found' });
		}

		const { originalname: name, filename: path } = request.file;

		const { url, id, updated_at, created_at } = await File.create({
			name,
			path,
		});

		await Deliverer.update(
			{ avatar_id: id },
			{
				where: { id: request.params.id },
			}
		);

		return response.json({ url, id, updated_at, created_at });
	},
};
