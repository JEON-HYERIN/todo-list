(function() {	
})();
let todosArr = []; // 추후에 값을 재할당 예정이므로 let 키워드 사용
const savedTodosArr = localStorage.getItem('할 일'); // todosArr 값 저장하는 변수
const els = {};
const setElements = function() {
	els.section = document.querySelector('.todo');
	if(!!els.section) {
		els.todoForm = els.section.querySelector('.todo-form');
		els.todoInput = els.section.querySelector('.todo-input');
		els.todoList = els.section.querySelector('.todo-list');
		els.todoBtn = els.section.querySelector('.todo-btn');
		els.todoInfoArea = els.section.querySelector('.todo-info-area');
		els.todoInfo = els.section.querySelector('.todo-info');
		els.todoLength = els.section.querySelector('.todo-total');
		els.todoClearBtn = els.section.querySelector('.todo-clear-btn');
	}
}; 

const bindEvents = function() {
	window.addEventListener('load', handlerList.informTodo); // 로드되면 리스트 개수 확인해서 화면에 보여주기 위한 이벤트
	els.todoForm.addEventListener('submit', handlerList.createTodo);
	els.todoClearBtn.addEventListener('click', handlerList.clearAllTodo);
};

const handlerList = {
	informTodo: function() {
		els.todoLength.innerText = todosArr.length;
	},
	saveTodo: function() {
		localStorage.setItem('할 일', JSON.stringify(todosArr));
	}, 
	createTodo: function(e) {
		e.preventDefault();
		const todoText = els.todoInput.value;
		const todosObj = {
			id: Date.now(), // 고유 값을 가질 수 있도록 해당 메소드 사용
			text: todoText,
			completed: false // 처음에는 체크박스에 체크되어 있지 않으므로 false 값 할당
		};

		els.todoInput.value = ''; // 입력 필드 초기화

		todosArr.push(todosObj); // 입력받은 값을 todosArr 배열에 추가
		handlerList.saveTodo(); // 로컬 스토리지에 저장
		handlerList.paintTodo(todosObj); // 입력한 투두 리스트를 화면에 보여주는 함수 실행
		handlerList.informTodo();
	},
	paintTodo: function(todo) {
		const todoItem = document.createElement('li');
		todoItem.setAttribute('class', 'todo-item');
		todoItem.setAttribute('data-id', todo.id);
		els.todoList.appendChild(todoItem);

		const label = document.createElement('label');
		todoItem.appendChild(label);
		
		const checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		label.appendChild(checkbox);
		checkbox.addEventListener('click', function () {
			todo.completed = !todo.completed; // true <-> false 토글 가능하도록 NOT 연산자 사용
			handlerList.saveTodo(); // 로컬 스토리지에 저장
		});
		// 새로고침해도 체크박스 데이터 유지하기 위한 조건문
		if(!!todo.completed) {
			checkbox.setAttribute('checked', 'checked');
		} else {
			checkbox.removeAttribute('checked');
		}
		
		const span = document.createElement('span');
		span.innerText = todo.text;
		label.appendChild(span);

		const removeBtn = document.createElement('button');
		removeBtn.setAttribute('class', 'fa-solid fa-trash'); // 폰트어썸 아이콘 적용에 필요한 클래스 추가
		removeBtn.addEventListener('click', handlerList.removeTodo);
		todoItem.appendChild(removeBtn);
		// const todoListTemplate =
		// `<li class="todo-item" data-id=${todo.id}>
		// 	<label>
		// 	<input type="checkbox">
		// 		<span>${todo.text}</span>
		// 	</label>
		// 	<button class="fa-solid fa-trash"><span class="blind">삭제 버튼</span></button>
		// </li>`;
		// els.todoList.insertAdjacentHTML('beforeend',todoListTemplate);
		
		// const todoListEls = document.querySelectorAll('.todo-item');
		// const checkboxEls = document.querySelectorAll('.todo-list input[type="checkbox"]');
		// const checkboxEl = document.querySelector('.todo-list input[type="checkbox"]');
		// todoListEls.forEach(function(todoListEl) {
		// 	todoListEl.addEventListener('click', function() {
		// 		console.log('hello')
		// 	})
		// })
	},
	removeTodo: function(event) {
		const targetItem = event.target.parentElement;
		const newTodosArr = todosArr.filter((todo) => todo.id != targetItem.getAttribute('data-id')); //클릭한 요소의 id와 값이 불일치하는 데이터를 모아 새로운 배열 반환

		targetItem.remove(); // 클릭한 todoList 삭제
		todosArr = newTodosArr;
		handlerList.informTodo();
		handlerList.saveTodo(); // 로컬 스토리지에 저장
	},
	clearAllTodo: function() {
		if(!!els.todoList.hasChildNodes()) { // 자식요소가 있다면 (아무 때나 다 지우면 안되기 때문에 조건 걸기)
			els.todoList.replaceChildren(); // 인자 값 지정하지 않으면 모든 자식 노드를 비워줌
		}
		localStorage.clear(); // 로컬스토리지의 모든 데이터 삭제
		todosArr = []; // 배열 빈 값 할당
		handlerList.informTodo();
	}
};

const checkSavedTodosArr = function() {
	// 로컬 스토리지에 저장되어 있는 값이 있다면 해당 조건문 실행
	if (savedTodosArr !== null) {
		const paresdTodosArr = JSON.parse(savedTodosArr); // 문자열로 저장된 데이터를 기존의 원본 데이터로 변환
		todosArr = paresdTodosArr; // 기존에 저장되어 있던 값을 todosArr 배열에 추가
		paresdTodosArr.forEach(handlerList.paintTodo); // 배열 반복문 실행해서 화면에 출력
	}
}

let init = function() {
	setElements();
	checkSavedTodosArr();
	bindEvents();
}
init();