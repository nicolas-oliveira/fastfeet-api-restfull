import { Model, DataTypes } from 'sequelize';

class Recipient extends Model {
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
						notNull: {
							msg: 'Name not found',
						},
					},
				},
				number: {
					type: DataTypes.NUMBER,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Number can't be empty",
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
						notEmpty: {
							msg: "State can't be empty",
						},
					},
				},
				zip_code: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Zip_code can't be empty",
						},
						notNull: {
							msg: 'Zip_code not found',
						},
					},
				},
				country: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
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
		this.belongsTo(models.Adm, { foreignKey: 'adm_id', as: 'owner' });
	}
}

export default Recipient;
