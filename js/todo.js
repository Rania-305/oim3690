const STORAGE_KEY = 'todo-items';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('todo-empty');

let todos = loadTodos();

function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const item = document.createElement('li');
        item.className = todo.completed ? 'completed' : '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));

        const text = document.createElement('span');
        text.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(index));

        item.append(checkbox, text, deleteButton);
        list.appendChild(item);
    });

    emptyMessage.classList.toggle('hidden', todos.length > 0);
}

function addTodo(text) {
    todos.push({ text, completed: false });
    saveTodos();
    render();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    render();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    render();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
        return;
    }
    addTodo(text);
    input.value = '';
    input.focus();
});

render();
