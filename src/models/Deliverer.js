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
	}
}

export default Deliverer;
