const toDoForm = document.querySelector('.todo-form');
const toDoInput = document.querySelector('.todo-form input');
const toDoList = document.querySelector('.todo-list');

const TODOS_KEY = 'todos';

const toDos = [];

function saveToDos() {
    // 해당 함수가 하는일은 오직 toDos Array를 localStorage에 집어 넣는 것
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    // target은 클릭된 HTML element
    const li = event.target.parentElement;
    li.remove();
}

function paintToDo(newTodo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = newTodo;
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
    // 텍스트(newTodo)를 toDos array에 푸쉬
    toDos.push(newTodo);
    // 그 다음 화면에 toDos를 그려줌 
    paintToDo(newTodo);
    // toDos들을 저장
    saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos)
if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    // forEach는 array의 각 item에 대해 function을 실행하게 해줌
    console.log(parsedToDos);
    parsedToDos.forEach((item) => console.log('이 아이템은', item));
}