import { setSeconds, setHours, setMinutes } from 'date-fns';

module.exports = (date) => {
	const hours = ['08:00', '18:00'];

	return hours.map((time) => {
		const [hour, minute] = time.split(':');
		const timeFormatted = setSeconds(
			setMinutes(setHours(date, hour), minute),
			0
		);
		return timeFormatted;
	});
};
