document.getElementById('addFriendForm').addEventListener('submit', function(e) {
	e.preventDefault(); // Evita el envío del formulario

	// Obtiene el correo y la sesión almacenados en el sessionStorage
	var email = sessionStorage.getItem('email');
	var session = sessionStorage.getItem('session');

	// Obtiene el correo del amigo ingresado en el formulario
	var friendEmail = document.getElementById('friendEmail').value;

	// Realiza la solicitud POST a través de AJAX
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:6900/XatLenguajes/Friend', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				var response = xhr.responseText;
				handleAddFriendResponse(response);
			}
		}
	};
	xhr.send('mail=' + email + '&session=' + session + '&friend=' + friendEmail);
});

function handleAddFriendResponse(response) {
	switch (response) {
		case '0':
			alert('El servidor no responde.');
			break;
		case '1':
			alert('Amigo agregado correctamente.');
			break;
		case '2':
			alert('Amigo no encontrado.');
			break;
		case '3':
			alert('El código de sesión ha expirado y se requiere iniciar sesión nuevamente.');
			break;
		default:
			alert('Error desconocido.');
			break;
	}
}
