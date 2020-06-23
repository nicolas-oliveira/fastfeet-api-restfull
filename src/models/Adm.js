import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class Adm extends Model {
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
							msg: 'Incorrect format for email field',
						},
					},
				},
				password: {
					type: DataTypes.VIRTUAL,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: "Password can't be empty",
						},
						len: {
							args: [6, 120],
							msg: 'Password need to be greater then 6 and less than 120',
						},
					},
				},
				password_hash: DataTypes.STRING,
			},
			{ sequelize }
		);

		this.addHook('beforeSave', async (adm) => {
			if (adm.password) {
				adm.password_hash = await bcrypt.hash(adm.password, 8);
			}
		});
		return this;
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default Adm;
