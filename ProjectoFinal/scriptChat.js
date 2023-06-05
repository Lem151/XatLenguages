


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
    //no enviamos mensajes vacios y asi no saturamos la BD
    if(message != "") {
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
          recibirMensajes(email, session); // Llamada para recibir mensajes después de enviar uno
          displayMessage(email, message);
  
        },
        error: function(xhr, status, error) {
          console.error('Error al enviar mensaje:', error);
        }
      });
    }
    // Realizar la solicitud POST a través de AJAX

    messageInput.value = '';
  }

  function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="sender">${sender}:</span> ${message}`;

    chatMessages.appendChild(messageElement);
  }
  //Recive mensajes de otros pero no los muestra si no son la persona con la que chateas, aun asi los borra de la base de datos por un fallo del backend 
  function recibirMensajes(mail, session) {
    // Realizar la solicitud GET a través de AJAX
    console.log("entra en la funcion")
    $.ajax({
      url: 'http://localhost:6900/XatLenguajes/Xat',
      type: 'GET',
      data: {
        mail: mail,
        session: session
      },
      
      success: function(response) {
        var res = JSON.parse(response);
        console.log(res.text)
        console.log(res.emisor, res.text);
  
        //Mira si hay info en el mensaje
        if(res.text != "" && res.emisor == friendEmail) {
          //Muestra el mensaje 
          displayMessage(res.emisor, res.text);
        }

      },
      error: function(xhr, status, errorThrown) {
        console.error('Error al recibir mensajes:', errorThrown);
      }
    });
    
  }
});

