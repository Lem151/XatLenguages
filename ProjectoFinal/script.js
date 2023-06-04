function registerFormSubmit(event) {
    event.preventDefault();

    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var mail = document.getElementById('mail').value;
    var codeCountry = document.getElementById('codeCountry').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:6900/XatLenguajes/Register', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            console.log(response);
            // Puedes procesar la respuesta del servidor aquí
        }
    };
    var params = 'user=' + encodeURIComponent(user) + '&pass=' + encodeURIComponent(pass) + '&mail=' + encodeURIComponent(mail) + '&codeCountry=' + encodeURIComponent(codeCountry);
    xhr.send(params);
}

function populateCountrySelect() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:6900/XatLenguajes/Register', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
            var countries = JSON.parse(xhr.responseText);
            var select = document.getElementById('codeCountry');

            countries.forEach(function(country) {
                var option = document.createElement('option');
                option.value = country.code;
                option.text = country.name;
                select.appendChild(option);
            });
        }
    };
    xhr.send();
}

// Llamar a las funciones en el momento adecuado
window.addEventListener('DOMContentLoaded', populateCountrySelect);
document.getElementById('register-form').addEventListener('submit', registerFormSubmit);
