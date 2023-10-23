const login = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-input');

function onLogin(event) {
	event.preventDefault(); // 기본동작 방지
	const userName = loginInput.value; // 입력필드 값 userName 변수에 할당 
	localStorage.setItem('userName', userName); // 로컬 스토리지에 저장
	paintUserName(userName); // 사용자 이름을 화면에 보여주는 함수 실행
}

function paintUserName(userName) {
	const h2 = document.createElement('h2');
	login.appendChild(h2);
	h2.innerText = `하이루 ${userName}😀`;
	login.classList.add('is-active'); // 사용자 이름이 보여지면 form 요소는 화면에서 안 보이도록 하기 위해 클래스 추가
}

const savedUserName = localStorage.getItem('userName'); // 사용자 이름 저장하는 변수

// 이미 저장된 값이 없다면
if (savedUserName === null) {
	loginForm.addEventListener('submit', onLogin); //login 함수 실행
} else {
	paintUserName(savedUserName); //저장된 값 화면에 보여주는 함수 실행
}