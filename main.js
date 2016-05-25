window.addEventListener('load', function () {
	var today = new Date(),
			year = today.getFullYear(),
			month = today.getMonth(),
			countDays = document.querySelector('.count_days'),
			countHours = document.querySelector('.count_hours'),
			countMinutes = document.querySelector('.count_minutes'),
			countSeconds = document.querySelector('.count_seconds'),
			startDays = 27,
			startHours = 18,
			startMinutes = 30,
			startSeconds = 60,
			day = today.getDate(),
			hours = today.getHours(),
			minutes = today.getMinutes(),
			seconds = today.getSeconds();

	function getStartComingSoon() {
		today = new Date(),
		day = today.getDate(),
		hours = today.getHours(),
		minutes = today.getMinutes(),
		seconds = today.getSeconds();
		
		countSeconds.innerHTML = 60 - seconds;
		countMinutes.innerHTML = 60 - minutes;
		countHours.innerHTML = 24 - hours;
		countDays.innerHTML = startDays - day;
	};

	function nul() {
		countSeconds.innerHTML = 0;
		countMinutes.innerHTML = 0;
		countHours.innerHTML = 0;
		countDays.innerHTML = 0;
	};

	if (year != 2016 || month != 4) {
		nul();
	} else {
		if (hours == startHours) {
			if (minutes == startMinutes) {
				if (seconds == startSeconds) {
					nul();
				}
			}
		}
		setInterval(getStartComingSoon, 1000)
	};
});