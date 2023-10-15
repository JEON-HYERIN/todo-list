const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-form__input');
const loginName = document.querySelector('.login-info__name');

const INVISIBLE_CLASSNAME = 'invisible';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
	event.preventDefault();
	const username = loginInput.value;
	loginForm.classList.add(INVISIBLE_CLASSNAME);
	localStorage.setItem(USERNAME_KEY, username);
	DisplayUsername(username);
}

function DisplayUsername(username) {
	loginName.innerText = `안녕하세요 ${username}님!`;
	loginName.classList.remove(INVISIBLE_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
	// form 보여주기
	loginForm.classList.remove(INVISIBLE_CLASSNAME);
	loginForm.addEventListener('submit', onLoginSubmit);
} else {
	// 사용자 이름 보여주기
	DisplayUsername(savedUsername);
}