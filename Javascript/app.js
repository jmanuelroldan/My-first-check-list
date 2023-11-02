// Selectors
const todoInput = document.querySelector(`.todo__form--input`);
const todoButton = document.querySelector(`.todo__form--button`);
const filterOption = document.querySelector(`.filter-todo`)
const todoList= document.querySelector(`.todo__container-list`);
// Event listeners
todoButton.addEventListener(`click`, addTodo);
todoList.addEventListener(`click`, deleteCheck);
filterOption.addEventListener(`click`, filterTodo);
// Functions

function addTodo(event){
    //Previene que se suba el formulario
    event.preventDefault();
    //create todo DIV    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add ("todo");
    //create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add ("todo__item");
    newTodo.classList.add ("item");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    //Completed button
    const completedButton = document.createElement(`button`);
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete__btn")
    todoDiv.appendChild(completedButton);
  
    //Delete button
    const deleteButton = document.createElement(`button`);
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete__btn")
    todoDiv.appendChild(deleteButton);
    //appendToList
    todoList.appendChild(todoDiv);
    // Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e){
const item = e.target;
// delete todo (linkeo el item a su elemento padre y lo guardo en la var todo,
// para que al borrarlo se borre el item y su elemento padre) 
if(item.classList[0] === "delete__btn"){
    const todo = item.parentElement;
    todo.classList.add("animacion");
    todo.addEventListener("transitionend", function(){
        todo.remove();
    });
}
//check todo
if(item.classList[0] === "complete__btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
}
}

function filterTodo(e) {
        const todos = todoList.querySelectorAll(".todo"); 
        console.log(todos);
        todos.forEach(function(todo) {
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none"
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains('completed')){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none"
                    }
                    break;
                }
            
        });
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}