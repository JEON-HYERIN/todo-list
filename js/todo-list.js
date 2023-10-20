const toDoForm = document.querySelector('.todo-form');
const toDoInput = document.querySelector('.todo-input');
const toDoList = document.querySelector('.todo-list');

let toDos = [];

function writeToDo(e) {
    // 기본동작 방지
    e.preventDefault();
    const toDoValue = toDoInput.value;
    // 텍스트 창 초기화
    toDoInput.value = '';
    toDos.push(toDoValue);
    localStorage.setItem('할일', JSON.stringify(toDos));
    showToDo(toDoValue);
}

function showToDo(toDo) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const button = document.createElement('button');
    toDoList.appendChild(li);
    li.appendChild(label);
    label.appendChild(input);
    input.setAttribute('type', 'checkbox');
    span.textContent = toDo;
    label.appendChild(span);
    li.appendChild(button);
    // 폰트어썸 아이콘 적용에 필요한 클래스 추가
    button.setAttribute('class', 'fa-solid fa-x');
    button.addEventListener('click', deleteToDo);
}

function deleteToDo(e) {
    const li = e.target.parentElement;
    li.remove();
}
toDoForm.addEventListener('submit', writeToDo);

const savedToDos = localStorage.getItem('할일');

if(savedToDos !== null) {
    const paresdToDos = JSON.parse(savedToDos);
    toDos = paresdToDos;
    paresdToDos.forEach(showToDo);
}