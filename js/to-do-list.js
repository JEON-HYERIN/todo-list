const toDoForm = document.querySelector('.to-do-form');
const toDoInput = document.querySelector('.to-do-input');
const toDoList = document.querySelector('.to-do-list');

let toDos = [];

function writeToDo(e) {
    // 기본동작 방지
    e.preventDefault();
    const toDoValue = toDoInput.value;
    // 텍스트 창 초기화
    toDoInput.value = '';
    toDos.push(toDoValue);
    localStorage.setItem('list', JSON.stringify(toDos));
    showToDo(toDoValue);
}

function showToDo(toDo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    toDoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
    span.textContent = toDo;
    button.textContent = 'X';
    button.addEventListener('click', deleteToDo);
}

function deleteToDo(e) {
    const li = e.target.parentElement;
    li.remove();
}
toDoForm.addEventListener('submit', writeToDo);

const savedToDos = localStorage.getItem('list');

if(savedToDos !== null) {
    const paresdToDos = JSON.parse(savedToDos);
    toDos = paresdToDos;
    paresdToDos.forEach(showToDo);
}