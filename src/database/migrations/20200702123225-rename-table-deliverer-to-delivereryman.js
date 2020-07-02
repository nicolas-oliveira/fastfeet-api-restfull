module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.renameTable('deliverers', 'deliverymans');
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.renameTable('deliverymans', 'deliverers');
	},
};
