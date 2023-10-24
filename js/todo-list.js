const todoForm = document.querySelector('.todo-form');
const todo = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = []; // 추후에 값을 재할당 예정이므로 let 키워드 사용

function saveTodo() {
	localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodo(event) {
	event.preventDefault(); // 기본동작 방지
	const todoText = todo.value;
	todo.value = ''; // 입력 필드 초기화
	const todosObj = {
		id: Date.now(), // 고유 값을 가질 수 있도록 해당 메소드 사용
		text: todoText,
		completed: false // 처음에는 체크박스에 체크되어 있지 않으므로 false 값 할당
	};
	todos.push(todosObj); // 입력받은 값을 todos 배열에 추가
	saveTodo(); // 로컬 스토리지에 저장
	paintTodo(todosObj); // 입력한 투두 리스트를 화면에 보여주는 함수 실행
}

function paintTodo(todo) {
	const li = document.createElement('li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	const span = document.createElement('span');
	const button = document.createElement('button');

	todoList.appendChild(li);
	li.setAttribute('data-id', todo.id);
	li.appendChild(label);
	label.appendChild(checkbox);
	checkbox.setAttribute('type', 'checkbox');
	checkbox.addEventListener('change', function () {
		todo.completed = !todo.completed; // true <-> false 토글 가능하도록 NOT 연산자 사용
		saveTodo(); // 로컬 스토리지에 저장
	});
	todo.completed ? checkbox.setAttribute('checked', 'checked') : checkbox.removeAttribute('checked'); // 새로고침해도 체크박스 데이터 유지하기 위한 조건문
	label.appendChild(span);
	span.innerText = todo.text;
	li.appendChild(button);
	button.setAttribute('class', 'fa-solid fa-x'); // 폰트어썸 아이콘 적용에 필요한 클래스 추가
	button.addEventListener('click', removeTodo);
}

function removeTodo(event) {
	const li = event.target.parentElement;
	li.remove(); // 클릭한 li 삭제
	const newTodo = todos.filter((todo) => todo.id !== parseInt(li.getAttribute('data-id'))); //클릭한 요소의 id와 값이 불일치하는 데이터를 모아 새로운 배열 반환
	todos = newTodo;
	saveTodo(); // 로컬 스토리지에 저장
}

todoForm.addEventListener('submit', createTodo);

const savedTodos = localStorage.getItem('todos'); // todos 값 저장하는 변수

// 이미 저장된 todos 값이 있다면 해당 조건문 실행
if (savedTodos !== null) {
	const paresdTodos = JSON.parse(savedTodos); // 문자열로 저장된 데이터를 기존의 원본 데이터로 변환
	todos = paresdTodos; // 기존에 저장되어 있던 값을 todos 배열에 추가
	paresdTodos.forEach(paintTodo); // 배열 반복문 실행해서 화면에 출력
}