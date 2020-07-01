import { Model, DataTypes } from 'sequelize';

class Deliverer extends Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Name can't be empty",
						},
					},
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Email can't be empty",
						},
						isEmail: {
							msg: 'Incorret format for email field',
						},
					},
				},
			},
			{ sequelize }
		);

		return this;
	}

	static associate(model) {
		this.belongsTo(model.File, { foreignKey: 'avatar_id', as: 'avatar' });
	}
}

export default Deliverer;
