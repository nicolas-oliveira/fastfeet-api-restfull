import { Model, DataTypes } from 'sequelize';

class Deliveryman extends Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: "Name can't be null",
						},
						notEmpty: {
							msg: "Name can't be empty",
						},
					},
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Email is required',
						},
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
		this.hasMany(model.Delivery, {
			foreignKey: 'deliveryman_id',
			as: 'owner',
		});
	}
}

export default Deliveryman;
