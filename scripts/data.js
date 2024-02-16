let todoList = [
  {
    id: 1,
    description: "My first Task!",
    completed: false,
    edition: false,
  },
  {
    id: 2,
    description: "Second Task!",
    completed: false,
    edition: false,
  },
  {
    id: 3,
    description: "Third Task!",
    completed: true,
    edition: false,
  },
];

export function getTodos() {
  return todoList;
}

export function createTodo(description) {
  const lastElementId = todoList[todoList.length - 1]?.id;
  const id = lastElementId ? lastElementId + 1 : 1;

  todoList.push({
    id,
    description,
    completed: false,
  });
}

export function updateTodoDescription(id, description) {
  const todo = todoList.find((todo) => todo.id === id);
  todo.description = description;
}

export function changeEditState(id) {
  const todo = todoList.find((todo) => todo.id === id);

  if (todo.edition) {
    todo.edition = false;
  } else {
    todo.edition = true;
  }
}

export function changeTodoState(id) {
  const todo = todoList.find((todo) => todo.id === id);

  if (todo.completed) {
    todo.completed = false;
  } else {
    todo.completed = true;
  }
}

export function deleteTodo(id) {
  const filteredTodoList = todoList.filter((todo) => {
    return todo.id !== id;
  });

  todoList = filteredTodoList;
}
