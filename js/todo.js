let userTodos = []

const todosContainer = document.querySelector('.todo')

const todo = document.querySelector('.todo-title')
const todoContainer = document.querySelector('.todo-container')

const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')


function isDisplayTodo(displayTodo){
    if(todoContainer.classList.contains('todo-container_active')){
        todoContainer.classList.remove('todo-container_active')
    }
    if(displayTodo){
        todo.style.visibility = 'visible'
    }else{
        todo.style.visibility = 'hidden'
    }
}
todo.addEventListener('click',()=>{
    todoContainer.classList.toggle('todo-container_active')
})
todoInput.addEventListener('change', ()=>{  
    createTodoItem(todoInput.value)
    todoInput.value = ''
})
function createTodoItem(todoItemText, isItemActive){
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-items__column')
    todoItem.innerHTML = `<label class="checkbox-container todo-item ${isItemActive || ''}">
    <span class="todo-item-text">${todoItemText}</span>
            <input type="checkbox" name="todo-item-1" ${ isItemActive ? 'checked' : ''}>
            <span class="checkmark"></span>
            </label>
            <span class="todo-remove"></span>`
    todoItemsList.append(todoItem)
}

todoItemsList.addEventListener('change', (e)=>{
    //e.preventDefault()
    const eventTarget = e.target.closest('.todo-item')
    if(eventTarget.classList.contains('todo-item-inactive')){
        eventTarget.classList.remove('todo-item-inactive')
    }else{
        eventTarget.classList.add('todo-item-inactive')
    }
    
})
todoItemsList.addEventListener('click', (e)=>{
    if(e.target.closest('.todo-remove')){
       e.target.closest('.todo-items__column').remove()
    }
})

function saveUserTodos(){
    const todoItems = document.querySelectorAll('.todo-items__column') 
        todoItems.forEach(element => {
            let singleTodo = {}
            singleTodo.text = element.querySelector('.todo-item-text').textContent;
            singleTodo.classes = element.querySelector('.todo-item').classList;
            userTodos.push(singleTodo)

        });
}

window.addEventListener('beforeunload', ()=>{
    userTodos = []
    saveUserTodos()
    localStorage.setItem("userTodos", JSON.stringify(userTodos));
})

window.addEventListener('load', ()=>{  
    userTodos =  JSON.parse(localStorage.getItem("userTodos")) || [];
    reestablishTodo(userTodos)
})

function reestablishTodo(todos){
    todos.forEach(element =>{
        createTodoItem(element.text, Object.values(element.classes)[2] || '')
   })
}
