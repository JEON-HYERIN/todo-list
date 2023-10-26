(function() {	
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
		}
	}; 

	const saveTodo = function() {
		localStorage.setItem('할 일', JSON.stringify(todosArr));
	};

	const bindEvents = function() {
		els.todoForm.addEventListener('submit', handlerList.createTodo);
	};
	
	const handlerList = {
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
			saveTodo(); // 로컬 스토리지에 저장
			handlerList.paintTodo(todosObj); // 입력한 투두 리스트를 화면에 보여주는 함수 실행
		},
		paintTodo: function(todo) {
			const li = document.createElement('li');
			const label = document.createElement('label');
			const checkbox = document.createElement('input');
			const span = document.createElement('span');
			const removeBtn = document.createElement('button');
		
			els.todoList.appendChild(li);
			li.setAttribute('data-id', todo.id);
			li.appendChild(label);
			label.appendChild(checkbox);
			checkbox.setAttribute('type', 'checkbox');
			checkbox.addEventListener('click', function () {
				todo.completed = !todo.completed; // true <-> false 토글 가능하도록 NOT 연산자 사용
				saveTodo(); // 로컬 스토리지에 저장
			});
			// 새로고침해도 체크박스 데이터 유지하기 위한 조건문
			if(todo.completed) {
				checkbox.setAttribute('checked', 'checked');
			} else {
				checkbox.removeAttribute('checked');
			}
			label.appendChild(span);
			span.innerText = todo.text;
			li.appendChild(removeBtn);
			removeBtn.setAttribute('class', 'fa-solid fa-x'); // 폰트어썸 아이콘 적용에 필요한 클래스 추가
			removeBtn.addEventListener('click', handlerList.removeTodo);
		},
		removeTodo: function(event) {
			const li = event.target.parentElement;
			const newTodo = todosArr.filter((todo) => todo.id != li.getAttribute('data-id')); //클릭한 요소의 id와 값이 불일치하는 데이터를 모아 새로운 배열 반환
	
			li.remove(); // 클릭한 li 삭제
			todosArr = newTodo;
			saveTodo(); // 로컬 스토리지에 저장
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
})();