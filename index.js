import {
  changeEditState,
  changeTodoState,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodoDescription,
} from "./scripts/data.js";

// DOM Elements
const todoListContainer = document.getElementById("todo-list");
const inputElement = document.getElementById("input-element");
const buttonElement = document.getElementById("submit");

function sendTodo() {
  const inputValue = inputElement.value;

  if (inputValue) {
    createTodo(inputValue);
    renderTodos(getTodos());
    inputElement.value = "";
  }
}

function renderTodos(todoList) {
  todoListContainer.textContent = "";

  for (let todo of todoList) {
    const todoListElement = document.createElement("li");
    todoListElement.classList.add("todo-element");

    todoListContainer.appendChild(todoListElement);

    const todoCheckBox = document.createElement("input");
    todoCheckBox.type = "checkbox";

    todoListElement.appendChild(todoCheckBox);

    let todoDescription;

    if (todo.edition) {
      todoDescription = document.createElement("input");
      todoDescription.value = todo.description;

      todoDescription.addEventListener("keydown", (e) => {
        console.log(e);
        if (e.key === "Enter") {
          updateTodoDescription(todo.id, todoDescription.value);
          changeEditState(todo.id);
          renderTodos(getTodos());
        }
      });

      todoListElement.appendChild(todoDescription);
      todoDescription.focus();
    } else {
      todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;

      todoDescription.addEventListener("dblclick", () => {
        changeEditState(todo.id);
        renderTodos(getTodos());
      });

      todoListElement.appendChild(todoDescription);
    }

    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "⭕";

    if (todo.completed) {
      todoCheckBox.checked = todo.completed;
      todoListElement.classList.add("todo-element-checked");
    }

    todoCheckBox.addEventListener("change", () => {
      changeTodoState(todo.id);
      renderTodos(getTodos());
    });

    deleteIcon.addEventListener("click", () => {
      deleteTodo(todo.id);
      renderTodos(getTodos());
    });

    todoListElement.appendChild(deleteIcon);
  }
}

buttonElement.addEventListener("click", sendTodo);
inputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendTodo();
  }
});

renderTodos(getTodos());
