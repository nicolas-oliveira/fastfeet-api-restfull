import { Model, DataTypes } from 'sequelize';

class Recipient extends Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Name is required',
						},
						notEmpty: {
							msg: "Name can't be empty",
						},
					},
				},
				number: {
					type: DataTypes.NUMBER,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Number is required',
						},
						notEmpty: {
							msg: "Number can't be empty",
						},
						isDecimal: {
							msg: 'Number need to be decimal',
						},
						min: {
							args: 1,
							msg: "Number can't be less then 0",
						},
					},
				},
				street: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Street is required',
						},
						notEmpty: {
							msg: "Street can't be empty",
						},
					},
				},
				city: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "City can't be empty",
						},
					},
				},
				state: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'State is required',
						},
						notEmpty: {
							msg: "State can't be empty",
						},
					},
				},
				zip_code: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Zip_code is required',
						},
						notEmpty: {
							msg: "Zip_code can't be empty",
						},
					},
				},
				country: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: {
							msg: 'Country is required',
						},
						notEmpty: {
							msg: "Country can't be empty",
						},
					},
				},
			},
			{ sequelize }
		);

		return this;
	}

	static associate(models) {
		this.hasMany(models.Adm, { foreignKey: 'adm_id', as: 'owner' });
		this.hasMany(models.Delivery, {
			foreignKey: 'recipient_id',
			as: 'recipient',
		});
	}
}

export default Recipient;
