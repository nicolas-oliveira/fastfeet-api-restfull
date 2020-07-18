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
						notEmpty: {
							msg: "Product can't be empty",
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
						notEmpty: {
							msg: "Start_date can't be empty",
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
						notEmpty: {
							msg: "End_date can't be empty",
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
		this.belongsTo(model.File, {
			foreignKey: 'signature_id',
			as: 'signature',
		});
		this.hasMany(model.Report, { foreignKey: 'delivery_id', as: 'deliveries' });
	}
}

export default Delivery;
