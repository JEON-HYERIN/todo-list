const login = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-input');
// const userName = document.querySelector('.user-name');

function onLogin(e) {
	// 기본동작 방지
	e.preventDefault();
	const name = loginInput.value;
	// 데이터 저장
	localStorage.setItem('이름', name);
	// 화면에 출력
	showUserName(name);
}

function showUserName(name) {
	const userName = document.createElement('h2');
	login.appendChild(userName);
	userName.textContent = `하이루 ${name}😀`;
	login.classList.add('is-active');
}

const savedUserName = localStorage.getItem('이름');

if (savedUserName === null) {
	loginForm.addEventListener('submit', onLogin);
} else {
	showUserName(savedUserName);
}