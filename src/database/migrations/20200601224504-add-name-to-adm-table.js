module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('adms', 'name', {
			type: Sequelize.STRING,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('adms', 'age');
	},
};
