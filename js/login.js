const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-input');
const userName = document.querySelector('.user-name');

const INVISIBLE_CLASSNAME = 'invisible';
const NAME_KEY = 'name';

function onLogin(e) {
	// 기본동작 방지
	e.preventDefault();
	const name = loginInput.value;
	// 데이터 저장
	localStorage.setItem(NAME_KEY, name);
	// 화면에 출력
	showUserName(name);
}

function showUserName(name) {
	loginForm.classList.add(INVISIBLE_CLASSNAME);
	// 폼 화면에서 안보이도록 클래스 추가
	userName.textContent = `안녕하세요. ${name}님😀`;
	// 사용자 이름 화면에 보이도록 클래스 제거
	userName.classList.remove(INVISIBLE_CLASSNAME);
}

const savedUserName = localStorage.getItem(NAME_KEY);

if (savedUserName === null) {
	loginForm.addEventListener('submit', onLogin);
} else {
	showUserName(savedUserName);
}