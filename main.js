window.addEventListener('load', function () {
	var dateStartST = new Date(2016, 4, 27, 18, 30),
			startST = dateStartST.valueOf(),
// get dom el
			countDays = document.querySelector('.count_days'),
			countHours = document.querySelector('.count_hours'),
			countMinutes = document.querySelector('.count_minutes'),
			countSeconds = document.querySelector('.count_seconds');
	
	function StartComingSoon() {
// math days, hour, minutes, seconds
		var today = new Date(),
				todayST = today.valueOf(),
				mathDays = Math.floor((startST - todayST) / (1000 * 60 * 60 * 24)),
				mathHours = Math.floor((startST - todayST) / (1000 * 60 * 60)),
				mathMinutes = Math.floor((startST - todayST) / (1000 * 60)),
				mathSeconds = Math.floor((startST - todayST) / (1000));

		if (mathSeconds > 0) {
			countDays.innerHTML = mathDays;
			countHours.innerHTML = mathHours - (mathDays * 24);
			countMinutes.innerHTML = mathMinutes - (mathHours * 60);
			countSeconds.innerHTML = mathSeconds - (mathMinutes * 60);
		} else {
			countSeconds.innerHTML = 0;
			countMinutes.innerHTML = 0;
			countHours.innerHTML = 0;
			countDays.innerHTML = 0;
		}
	}
	
	setInterval(StartComingSoon, 1000);
});