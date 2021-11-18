// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const todoDeleteBtn = document.querySelector(".delete-btn");
const todoCheckedBtn = document.querySelector(".checked-btn");
const warning = document.querySelector(".warning");
const filterTodoList = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded",getTodos)

// to add todo in the list
todoBtn.addEventListener("click",()=>{
    if(todoInput.value != ""){
      // prevent from form submitting
      event.preventDefault();
    //TODO DIV
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      const newTodo = document.createElement("li");
      newTodo.innerText = todoInput.value;
    //   newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="uil uil-check"></i>`;
      completedButton.classList.add("checked-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="uil uil-trash-alt"></i>`;
      trashButton.classList.add("delete-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);

    //   Add todo to Local Storage
        saveLocalTodos(todoInput.value)

      // todoList.innerHTML += `
      // <div class="todo-item">
      // <li>${todoInput.value}</li>
      // <button class="checked-btn"><i class="uil uil-check"></i></button>
      // <button class="delete-btn"><i class="uil uil-trash-alt"></i></button>
      // </div>
      // `;
      todoInput.value = "";
      warning.innerHTML = "";
      // localStorage.setItem(todoList.innerHTML,value)
    }
    else{
            warning.innerHTML = `
            <h4>Add something to show !!<h4>
            `
    }
})

// Add and delete the todo list
todoList.addEventListener("click",(e)=>{
    const item = e.target;
    // delete the item
    if(item.classList[0] === "delete-btn"){
        // item.remove();
        let todoItem = item.parentElement;
        // Animate the deleted item
        todoItem.classList.add("fall");
        // removelocaltodos
        removeLocalTodos(todoItem);
        todoItem.addEventListener("transitionend",()=>{
            todoItem.remove();
        })
    }
    // Add the item
    if(item.classList[0] === "checked-btn"){
        let todoItem = item.parentElement;
        todoItem.classList.toggle("completed");
        item.firstChild.classList.toggle("checked");
        item.classList.toggle("checked");
        const checkItems = {
          
        }
        localStorage.setItem("checkedItem","hello");
        localStorage.setItem("checkedItem",todoItem.classList.toggle("completed"));
        localStorage.setItem("checkedItem",todoItem.classList.toggle("completed"));
        
    }
})

// filter todo list
// filterTodoList.addEventListener("click",(e)=>{
//     const todos = todoList.childNodes;
//     todos.forEach(function(item){
//         switch (e.target.value) {
//           case "all":
//             item.style.display = "flex";
//             break;
//           case "completed":
//             if (item.classList.contains("completed")) {
//               item.style.display = "block";
//             } else {
//               item.style.display = "none";
//             }
//             break;
//           case "uncompleted":
//             if (!todos.classList.contains("completed")) {
//               todos.style.display = "flex";
//             } else {
//               todos.style.display = "none";
//             }
//         }
//     })
// })
filterTodoList.addEventListener("click",filterTodo)
function filterTodo(e) {
//   const todos = todoList.childNodes;
  const todos = document.querySelectorAll(".todo-item");
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incompleted":
        if(!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// save todos to local storage
function saveLocalTodos(todo){
    // Check - Is there any todo present ?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo)=>{
      //TODO DIV
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      //   newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="uil uil-check"></i>`;
      completedButton.classList.add("checked-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="uil uil-trash-alt"></i>`;
      trashButton.classList.add("delete-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);

      todoInput.value = "";
      warning.innerHTML = "";
    })

}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    // console.log(todos.indexOf("ass"));
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}