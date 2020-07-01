import { Model, DataTypes } from 'sequelize';

class File extends Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				path: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				url: {
					type: DataTypes.VIRTUAL,
					get() {
						return `http://localhost:3333/deliverer/file/${this.path}`;
					},
				},
			},
			{ sequelize }
		);

		return this;
	}
}

export default File;