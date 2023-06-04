document.getElementById('loginForm').addEventListener('submit', function(e) {
	e.preventDefault(); // Evita el envío del formulario

	// Obtiene los valores del formulario
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	// Realiza la solicitud GET a través de AJAX
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:6900/XatLenguajes/Login?mail=' + email + '&pass=' + password, true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			var response = xhr.responseText;

			if (response === 'false') {
				alert('Credenciales incorrectas.');
			} else {
				// Guarda el correo y la sesión en el sessionStorage
				sessionStorage.setItem('email', email);
				sessionStorage.setItem('session', response);

				window.location.href = 'HubUsuario.html'; // Redirige a la página de inicio
			}
		}
	};
	xhr.send();
});

document.getElementById('registerButton').addEventListener('click', function() {
	window.location.href = 'registro.html';
});
