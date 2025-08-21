const form = document.getElementById('complaintForm');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

phoneInput.addEventListener('input', (e) => {
	let value = e.target.value.replace(/\D/g, '');

	if (value.startsWith('7') || value.startsWith('8')) {
		value = value.substring(1);
	}

	let formattedValue = '+7 (';

	if (value.length > 0) {
		formattedValue += value.substring(0, 3);
	}
	if (value.length > 3) {
		formattedValue += ') ' + value.substring(3, 6);
	}
	if (value.length > 6) {
		formattedValue += '-' + value.substring(6, 8);
	}
	if (value.length > 8) {
		formattedValue += '-' + value.substring(8, 10);
	}

	e.target.value = formattedValue;
});

form.addEventListener('submit', (e) => {
	submitBtn.disabled = true;
	submitBtn.textContent = 'Отправка...';
});
