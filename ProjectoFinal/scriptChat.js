document.addEventListener('DOMContentLoaded', () => {
  const friendEmail = sessionStorage.getItem('friendEmail');

  console.log('Chat con:', friendEmail);

  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');

  sendButton.addEventListener('click', sendMessage);

  function sendMessage() {
    const message = messageInput.value;
    const email = sessionStorage.getItem('email');
    const session = sessionStorage.getItem('session');
    const receiver = friendEmail;

    // Realizar la solicitud POST a través de AJAX
    $.ajax({
      url: 'http://localhost:6900/XatLenguajes/Xat',
      type: 'POST',
      data: {
        mail: email,
        session: session,
        receptor: receiver,
        sms: message
      },
      success: function(response) {
        // Realizar cualquier acción adicional después de enviar el mensaje
        console.log('Mensaje enviado:', message);

        // Mostrar el mensaje enviado en el chat
        displayMessage(email, message);
        recibirMensajes(email, session); // Llamada para recibir mensajes después de enviar uno
      },
      error: function(xhr, status, error) {
        console.error('Error al enviar mensaje:', error);
      }
    });

    messageInput.value = '';
  }

  function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="sender">${sender}:</span> ${message}`;

    chatMessages.appendChild(messageElement);
  }

  function recibirMensajes(mail, session) {
    // Realizar la solicitud GET a través de AJAX
    $.ajax({
      url: 'http://localhost:6900/XatLenguajes/Xat',
      type: 'GET',
      data: {
        mail: mail,
        session: session
      },
      success: function(response) {
        // Verificar si se recibió un mensaje válido
        if (response.emisor && response.text) {
          // Mostrar el mensaje recibido en el chat
          displayMessage(response.emisor, response.text);
          console.log(response);
        }
      },
      error: function(xhr, status, error) {
        console.error('Error al recibir mensajes:', error);
      }
    });
  }
});
