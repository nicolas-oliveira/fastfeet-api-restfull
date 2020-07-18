import { Model, DataTypes } from 'sequelize';

class Report extends Model {
	static init(sequelize) {
		super.init(
			{
				delivery_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				description: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Description is required',
						},
						notEmpty: {
							msg: 'Description is required',
						},
						len: {
							args: [10, 320],
							msg: 'Description need to be greater then 10 and less than 320',
						},
					},
				},
			},
			{ sequelize }
		);
		return this;
	}

	static associate(model) {
		this.belongsTo(model.Delivery, {
			foreignKey: 'delivery_id',
			as: 'deliveries',
		});
	}
}

export default Report;
