import { Model, DataTypes } from 'sequelize';

class Delivery extends Model {
	static init(sequelize) {
		super.init(
			{
				recipient_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Recipient_id is required',
						},
						notEmpty: {
							msg: "Recipient_id can't be empty",
						},
						isDecimal: {
							msg: 'Recipient_id need to be decimal',
						},
					},
				},
				product: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Product is required',
						},
						notEmpty: {
							msg: "Product can't be empty",
						},
					},
				},
				signature_id: {
					type: DataTypes.INTEGER,
					allowNull: true,
					validate: {
						isDecimal: {
							msg: 'Recipient_id need to be decimal',
						},
					},
				},
				canceled_at: {
					type: DataTypes.DATE,
					allowNull: true,
					validate: {
						isDate: {
							msg: 'Incorrect field for date',
						},
					},
				},
				start_date: {
					type: DataTypes.DATE,
					allowNull: true,
					validate: {
						isDate: {
							msg: 'Incorrect field for date',
						},
					},
				},
				end_date: {
					type: DataTypes.DATE,
					allowNull: true,
					validate: {
						isDate: {
							msg: 'Incorrect field for date',
						},
					},
				},
			},
			{ sequelize }
		);
		return this;
	}

	static associate(model) {
		this.belongsTo(model.Recipient, {
			foreignKey: 'recipient_id',
			as: 'recipient',
		});
		this.belongsTo(model.Deliveryman, {
			foreignKey: 'deliveryman_id',
			as: 'deliveryman',
		});
	}
}

export default Delivery;
