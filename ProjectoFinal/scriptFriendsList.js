document.addEventListener('DOMContentLoaded', () => {
	const friendsListElement = document.getElementById('friendsList');
  
	const email = sessionStorage.getItem('email');
	const session = sessionStorage.getItem('session');
  
	// Realiza la solicitud GET a través de AJAX
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:6900/XatLenguajes/Friend?mail=' + email + '&session=' + session, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200) {
		  const response = xhr.responseText;
		  handleFriendsListResponse(response);
		}
	  }
	};
	xhr.send();
  
	function handleFriendsListResponse(response) {
	  const friendsList = JSON.parse(response);
  
	  friendsListElement.innerHTML = '';
  
	  if (friendsList.length === 0) {
		const noFriendsMessage = document.createElement('li');
		noFriendsMessage.textContent = 'No tienes amigos en tu lista.';
		friendsListElement.appendChild(noFriendsMessage);
	  } else {
		for (let i = 0; i < friendsList.length; i++) {
		  const friendEmail = friendsList[i];
  
		  const friendElement = document.createElement('li');
		  friendElement.textContent = friendEmail;
		  friendElement.addEventListener('click', () => openChat(friendEmail));
		  friendsListElement.appendChild(friendElement);
		}
	  }
	}
  
	function openChat(friendEmail) {
	  sessionStorage.setItem('friendEmail', friendEmail);
	  window.location.href = 'chat.html';
	}
  });
  