const toDoForm = document.querySelector('.todo-form');
const toDoInput = document.querySelector('.todo-form input');
const toDoList = document.querySelector('.todo-list');

const TODOS_KEY = 'todos';

let toDos = [];

function saveToDos() {
    // 해당 함수가 하는일은 오직 toDos Array를 localStorage에 집어 넣는 것
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    // target은 클릭된 HTML element
    const li = event.target.parentElement;
    li.remove();
    // li.id는 데이터타입이 string이므로 number로 변경
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    // 다시저장
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    const button = document.createElement('button');
    button.innerText= '❌';
    button.addEventListener('click', deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = '';
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    // 텍스트(newTodo)를 toDos array에 푸쉬
    toDos.push(newTodoObj);
    // 그 다음 화면에 toDos를 그려줌 
    paintToDo(newTodoObj);
    // toDos들을 저장
    saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    // forEach는 array의 각 item에 대해 function을 실행하게 해줌
    parsedToDos.forEach(paintToDo);
}
