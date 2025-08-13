document.addEventListener('click', async (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;

		await remove(id);
		event.target.closest('li').remove();
	}
	if (event.target.dataset.type === 'update') {
		const id = event.target.dataset.id;
		const updatedTitle = prompt('Введите новое название!');

		if (updatedTitle) {
			await update({ id, title: updatedTitle });
			event.target.closest('li').querySelector('span').textContent = updatedTitle;
		}
	}
});

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	});
}

async function update(newNote) {
	await fetch(`/${newNote.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newNote),
	});
}
