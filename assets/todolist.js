const todos = document.querySelector('#todos');
let listOfTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
const input = document.querySelector('input[type="text"]');
const form = document.querySelector('form');

const timeOut = setTimeout(() => {
  document.querySelector('.spinnerParent').className = 'spinnerParent hidden';
  document.querySelector('.todocontainer').className = 'container todocontainer';
}, 2000)


const renderTodos = () => {
  todos.innerHTML = '';
  if (listOfTodos.length === 0) {
    todos.innerHTML = '<p class="no-todos">No todos yet. Add a new todo above!</p>';
  } else {
    listOfTodos.forEach((todo, index) => {
      const isLastItem = index === listOfTodos.length - 1;
      todos.innerHTML += `
        <li class="${isLastItem ? 'last-item' : ''}">
          <div class="left">
            <i class="${todo.completed ? 'fa fa-circle' : 'fa fa-circle-o'}" aria-hidden="true"></i>
            <span id="${todo.id}" class="${todo.completed ? 'completed' : ''}">${todo.todo}</span>
          </div>
          <button class="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </li>
        <br />
        `;
    });
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value;
  if (value.trim() !== '') {
    listOfTodos.push({
      id: `item${Date.now()}`,
      todo: value,
      completed: false
    });
    localStorage.setItem('todos', JSON.stringify(listOfTodos));
    renderTodos();
    input.value = '';
  }
});

todos.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete') || e.target.parentElement.classList.contains('delete')) {
    const li = e.target.closest('li');
    const todoId = li.querySelector('span').id;
    listOfTodos = listOfTodos.filter(todo => todo.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(listOfTodos));
    renderTodos();
    return;
  }

  if (e.target.tagName === 'LI' || e.target.closest('li')) {
    const li = e.target.closest('li');
    li.querySelector('span').classList.toggle('completed');
    const todoId = li.querySelector('span').id;
    const todoIndex = listOfTodos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      listOfTodos[todoIndex].completed = !listOfTodos[todoIndex].completed;
      localStorage.setItem('todos', JSON.stringify(listOfTodos));
      renderTodos();
    }
  }
});

renderTodos();
