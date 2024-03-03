// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');
const todoSelect = document.querySelector('.todo-select');


// EVENTS
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTodo);
todoSelect.addEventListener('click', selectTodo);
document.addEventListener('DOMContentLoaded', getTodos);


// FUNCTIONS

function addTodo(e){
    e.preventDefault();
    
    if(!todoInput.value.trim()) return;

    const todo = document.createElement('div');
    todo.classList.add('todo');
    
    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoText.innerText = todoInput.value;
    todo.appendChild(todoText);

    const icons = document.createElement('div');
    icons.classList.add('icons');
    icons.innerHTML = '<i class="fas fa-check"></i>';
    icons.innerHTML += '<i class="fas fa-trash"></i>';
    todo.appendChild(icons);
    
    todoList.appendChild(todo);
    saveInLocalStorage(todoInput.value);
    todoInput.value = '';

    
}


function checkTodo(e){
  
    const todo = e.target.parentElement.parentElement;

  if(e.target.classList[1] === 'fa-trash'){
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
       removeFromLocalStorage(todo.children[0].innerText);
        todo.remove();
    });
   
  }
  if(e.target.classList[1] === 'fa-check'){
      todo.classList.toggle('complated');
  }
}


function selectTodo(e){
    
    const todos = document.querySelectorAll('.todo');
   
       if(e.target.value == 'all'){
            todos.forEach((todo)=>{
                todo.style.display = 'flex';
            })
       }
       else if(e.target.value == 'complated') {
            todos.forEach((todo)=>{
                if(todo.classList.contains('complated')) todo.style.display = 'flex';
                else todo.style.display = 'none';
            })
       }
       else if (e.target.value == 'uncomplated'){
            todos.forEach((todo)=>{
                if(!todo.classList.contains('complated')) todo.style.display = 'flex';
                else todo.style.display = 'none';
            })
       }

}


// -------------------------- LOCALSTOGATE ------------------------------

function saveInLocalStorage(value){ // 'kim'
  let todos;
  if(localStorage.getItem('todos') == null){
      todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos')); 
  }

  todos.push(value); 
  localStorage.setItem('todos', JSON.stringify(todos) );// "['anna', 'ani', 'kim']"

}


function removeFromLocalStorage(value){ // 'anna'
    let todos = JSON.parse(localStorage.getItem('todos')); 
    
    const index = todos.indexOf(value);
    todos.splice(index, 1);
    
    localStorage.setItem('todos', JSON.stringify(todos) );
}
  

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem('todos')); 
    }

    todos.forEach((el)=>{
        const todo = document.createElement('div');
        todo.classList.add('todo');
        
        const todoText = document.createElement('div');
        todoText.classList.add('todo-text');
        todoText.innerText = el;
        todo.appendChild(todoText);
    
        const icons = document.createElement('div');
        icons.classList.add('icons');
        icons.innerHTML = '<i class="fas fa-check"></i>';
        icons.innerHTML += '<i class="fas fa-trash"></i>';
        todo.appendChild(icons);
        
        todoList.appendChild(todo);
    })


}