const todoInput = document.querySelector('#description');
const addBtn = document.querySelector('#btn');
const todoList = document.querySelector('.todo__list');

let todos = [];
let todoElems = [];

!localStorage.todos
  ? (todos = [])
  : (todos = JSON.parse(localStorage.getItem('todos')));

function Todo(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (todo, index) => {
  return `
  <div class="todo__item ${todo.completed ? 'checked' : ''}">
    <div class="description">${todo.description}</div>
      <div class="buttons">
        <input onclick="completeTodo(${index})" class="btn-complete" type="checkbox"
         ${todo.completed ? 'checked' : ''}>
        <button onclick="deleteTodo(${index})" class="btn-delete">Delete</button>
      </div>
  </div>
  `;
};

const filterTodos = () => {
  const activeTodos =
    todos.length && todos.filter(todo => todo.completed === false);
  const completedTodos =
    todos.length && todos.filter(todo => todo.completed === true);
  todos = [...activeTodos, ...completedTodos];
};

const addTodoList = () => {
  todoList.innerHTML = '';
  if (todos.length > 0) {
    filterTodos();
    todos.forEach((item, index) => {
      todoList.innerHTML += createTemplate(item, index);
    });
    todoElems = document.querySelectorAll('.todo__item');
  }
};

addTodoList();

const updateTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const completeTodo = index => {
  todos[index].completed = !todos[index].completed;
  if (todos[index].completed) {
    todoElems[index].classList.add('checked');
  } else {
    todoElems[index].classList.remove('checked');
  }
  updateTodos();
  addTodoList();
};

const deleteTodo = index => {
  todoElems[index].classList.add('delition');
  setTimeout(() => {
    todos.splice(index, 1);
    updateTodos();
    addTodoList();
  }, 500);
};

addBtn.addEventListener('click', () => {
  todos.push(new Todo(todoInput.value));
  updateTodos();
  addTodoList();
  todoInput.value = '';
});

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// if (localStorage.getItem('tasks')) {
//   tasks.map(task => {
//     createTask(task);
//   });
// }

// todoForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const input = this.name;
//   const inputValue = input.value;

//   if (inputValue != '') {
//     const task = {
//       id: new Date().getTime(),
//       name: inputValue,
//       isCompleted: false,
//     };

//     tasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     createTask(task);
//     todoForm.reset();
//   }
//   input.focus();
// });

// const input = document.querySelector(".todo__input']");
// const item = document.querySelector('todo__item');
// const btn = document.querySelector('todo__btn');

// function createTodo(text) {
//   const li = document.createElement('li');
//   const text = document.createElement('span');
//   textSpan.classList.add('todo__text');
//   const newTodo = input.value;
//   text.append(newTodo);
// }

// input.addEventListener('keypress', keyPressed => {
//   const keyEnter = 13;
//   if (keyPressed.which == keyEnter) {
//     createTodo();
//   }
// });
// ul.addEventListener('click', onClickTodo);

// document.addEventListener('DOMContentLoaded', onPageLoaded);
