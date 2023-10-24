const todoForm = document.querySelector('.todo-form');
const todo = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = []; // 추후에 값을 재할당 할 것이므로 let 사용

function createTodo(event) {
    event.preventDefault(); // 기본동작 방지
    const todoText = todo.value;
    todo.value = ''; // 입력 필드 초기화
    const todosObj = {
        id: Date.now(),
        text: todoText,
        checked: false
    };
    todos.push(todosObj); // 입력받은 값을 todos 배열에 추가
    localStorage.setItem('todos', JSON.stringify(todos)); // 로컬 스토리지에 저장
    paintTodo(todosObj); // 입력한 투두 리스트를 화면에 보여주는 함수 실행
}

function paintTodo(todo, index) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const button = document.createElement('button');

    todoList.appendChild(li); // todo-list에 자식 요소로 li 추가(맨 뒤에 추가됨)
    li.id = todo.id;
    li.appendChild(label); // li에 자식 요소로 label 추가
    label.appendChild(input); // label에 자식 요소로 label 추가
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', function() {
        todo.checked = !todo.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
    });
    if(todo.checked === true) {
        input.setAttribute('checked', 'checked');
    } else {
        input.removeAttribute('checked');
    }
    label.appendChild(span); // label에 자식 요소로 span 추가
    span.innerText = todo.text;
    li.appendChild(button); // li에 자식 요소로 button 추가
    button.setAttribute('class', 'fa-solid fa-x'); // 폰트어썸 아이콘 적용에 필요한 클래스 추가
    button.addEventListener('click', removeTodo);
}

function removeTodo(event) {
    const li = event.target.parentElement;
    li.remove(); // 클릭한 li 삭제
    const newTodo = todos.filter((todo) => todo.id !== parseInt(li.id));
    todos = newTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
}

todoForm.addEventListener('submit', createTodo);

const savedTodos = localStorage.getItem('todos'); // todo 값 저장하는 변수

// 이미 저장된 todos 값이 있다면
if(savedTodos !== null) {
    const paresdTodos = JSON.parse(savedTodos); // 문자열로 저장된 데이터를 기존의 원본 데이터로 변환
    todos = paresdTodos; // 기존에 저장되어 있던 값을 todos 배열에 추가
    paresdTodos.forEach(paintTodo); // 배열 반복문 실행해서 화면에 출력
}