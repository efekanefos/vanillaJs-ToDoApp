//? Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//? Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//? Functions

function addTodo(event) {
  //* Don't reload the page
  event.preventDefault();

  //* Create todoDiv

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //* Create todoListItem

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //! Add todo to the todos LocalStorage!

  saveLocalTodos(todoInput.value);

  //* Create Checked Button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //* Delete button

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //* Append to the TodoList

  todoList.appendChild(todoDiv);

  //* Clear TodoInput Value

  todoInput.value = "";
}

function deleteCheck(event) {
  //* Selecting target item

  const item = event.target;

  //* deleting target item's parent(list item)

  if (item.classList[0] === "trash-btn") {
    const listItem = item.parentElement;

    //* Animation

    listItem.classList.add("fall");

    //! Removing todo items from localStorage
    removeLocalTodos(listItem);

    //* transitionend

    listItem.addEventListener("transitionend", function () {
      listItem.remove();
    });
  }

  //* checking target item's parent(list item)

  if (item.classList[0] === "complete-btn") {
    const listItem = item.parentElement;
    listItem.classList.toggle("completed");
  }
}

function filterTodo(event) {
  //* Getting All of the todos
  const todos = todoList.childNodes;

  //* Creating Events For Different Cases

  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Checking if we have a todos in our localStorage or not
  // if not then we are creating a new and empty one
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  // with setItem we are updating the localStorage to it's final version
}

function getTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //* Create todoDiv

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //* Create todoListItem

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //* Create Checked Button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //* Delete button

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //* Append to the TodoList

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //* To remove Exact todo item we have to take that item's index number
  const todoIndex = todo.children[0].innerText;
  todos.splice(todoIndex, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
