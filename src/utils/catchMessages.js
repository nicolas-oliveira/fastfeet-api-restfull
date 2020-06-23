module.exports = function catchMessages(err) {
	return {
		errors: err.errors.map((e) => {
			return { path: e.path, message: e.message };
		}),
	};
};
