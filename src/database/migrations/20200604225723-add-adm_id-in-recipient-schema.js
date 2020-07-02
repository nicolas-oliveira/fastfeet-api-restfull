module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('recipients', 'adm_id', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: { model: 'adms', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('recipients', 'adm_id');
	},
};
