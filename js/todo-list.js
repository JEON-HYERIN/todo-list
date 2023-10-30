(function() {	
	let todosArr = []; // 추후에 값을 재할당 예정이므로 let 키워드 사용
	const savedTodosArr = localStorage.getItem('todos'); // todosArr 값 저장하는 변수
	const els = {};
	
	const setElements = function() {
		els.section = document.querySelector('.todo');
		if(!!els.section) { // 느낌표 두개(!!)는 다른 타입의 데이터를 boolean 타입으로 명시적으로 형 변환 하기 위해 사용
			els.todoForm = els.section.querySelector('.todo-form');
			els.todoInput = els.section.querySelector('.todo-input');
			els.todoList = els.section.querySelector('.todo-list');
			els.todoBtn = els.section.querySelector('.todo-btn');
			els.todoInfoArea = els.section.querySelector('.todo-info-area');
			els.todoInfo = els.section.querySelector('.todo-info');
			els.todoLength = els.section.querySelector('.todo-total');
			els.todoClearBtn = els.section.querySelector('.clear-btn');
		}
	}; 
	
	const bindEvents = function() {
		window.addEventListener('load', handlerList.informTodo); // 로드되면 리스트 개수 확인해서 화면에 보여주기 위한 이벤트
		els.todoInput.addEventListener('change', handlerList.createTodo); //change 이벤트 : 값이 변경될 때 이벤트 발생, 포커스를 잃을 때까지 이벤트가 실행되지 않음
		els.todoClearBtn.addEventListener('click', handlerList.clearAllTodo);
	};
	
	const handlerList = {
		informTodo: function() {
			els.todoLength.innerText = todosArr.length;
		},
		saveTodo: function() {
			localStorage.setItem('todos', JSON.stringify(todosArr));
		}, 
		createTodo: function(e) {
			const todoText = els.todoInput.value;
			const todosObj = {
				id: Date.now(), // 고유 값을 가질 수 있도록 해당 메소드 사용
				text: todoText,
				completed: false // 처음에는 체크박스에 체크되어 있지 않으므로 false 값 할당
			};
	
			els.todoInput.value = ''; // 입력 필드 초기화
			els.todoInput.focus(); // 입력 필드에 포커스 주기
	
			todosArr.push(todosObj); // 입력받은 값을 todosArr 배열에 추가
			handlerList.saveTodo(); // 로컬 스토리지에 저장
			handlerList.paintTodo(todosObj); // 입력한 투두 리스트를 화면에 보여주는 함수 실행
			handlerList.informTodo();
		},
		paintTodo: function(todo) {
			if ("content" in document.createElement("template")) { // template 태그가 있다면 조건문 실행
				const template = document.querySelector('#todo-item-template');
				const cloneTemplate = document.importNode(template.content, true); // importNode를 통해서 template 안쪽 내용 복사(자식노드를 전부 포함해서)
				const todoItem = cloneTemplate.querySelector('.todo-item'); 
				const todoCheckBox = cloneTemplate.querySelector('.todo-check');
				const todoItemText = cloneTemplate.querySelector('.todo-item span');
				const todoRemoveBtn = cloneTemplate.querySelector('.todo-item .remove-btn');
	
				els.todoList.appendChild(todoItem);
				todoItem.setAttribute('data-id', todo.id);
				todoItemText.innerText = todo.text;
	
				// 새로고침해도 체크박스 데이터 유지하기 위한 조건문
				if(todo.completed) {
					todoCheckBox.setAttribute('checked', 'checked');
				} else {
					todoCheckBox.removeAttribute('checked');
				}
	
				todoCheckBox.addEventListener('click', function () {
					todo.completed = !todo.completed; // true <-> false 토글 가능하도록 NOT 연산자 사용
					handlerList.saveTodo(); // 로컬 스토리지에 저장
				});
				todoRemoveBtn.addEventListener('click', handlerList.removeTodo);
			}
		},
		removeTodo: function(event) {
			const targetItem = event.target.parentElement;
			const newTodosArr = todosArr.filter((todo) => todo.id != targetItem.getAttribute('data-id')); //클릭한 요소의 id와 값이 불일치하는 데이터를 모아 새로운 배열 반환
			targetItem.remove(); // 클릭한 todoList 삭제
			todosArr = newTodosArr;
			handlerList.informTodo();
			handlerList.saveTodo(); // 로컬 스토리지에 저장
	
			// filter -> 해당 index를 배열에서 삭제하는 splice로 방식 변경(문제점: 두 번 클릭해야 이벤트 실행되며 중간 위치 클릭하지 않은 부분도 지워짐, 해결방법 못찾음)
			/*
			const removeBtnEls = document.querySelectorAll('.todo-item button');
			removeBtnEls.forEach(function(removeBtnEl, index) {
				removeBtnEl.addEventListener('click', function(event) {
					todosArr.splice(index, 1); // 클릭한 요소(btn)의 index부터 1개의 요소를 todosArr 배열에서 제거
					handlerList.saveTodo(); // 로컬 스토리지에 저장
					handlerList.informTodo();
					removeBtnEl.parentElement.remove(); // 클릭한 요소의 부모(li) 제거
				});
			});
			*/
		},
		clearAllTodo: function() {
			// 자식요소가 있다면 해당 조건문 실행(아무 때나 다 지우면 안되기 때문에 조건 걸기)
			if(els.todoList.hasChildNodes()) {
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
		bindEvents();
		checkSavedTodosArr();
	}
	init();
})(); // 즉시 실행 함수 실행 (사용이유: 변수를 전역(global scope)으로 선언하는 것을 피하기 위해서)