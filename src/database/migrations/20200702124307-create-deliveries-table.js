module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('deliveries', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			recipient_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'recipients', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			deliveryman_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'deliverymans', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			product: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			signature_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			canceled_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			start_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			end_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('deliveries');
	},
};
