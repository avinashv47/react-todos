import axios from "axios";
import "../App.css";
import TodoInputForm from "./todo-input-form";

import { useReducer, useEffect } from "react";
import Todo from "./todo";

function reducer(state, action) {
  const { event, value } = action;
  switch (event) {
    case "initial_load":
      return {
        ...state,
        todosList: value,
      };
    case "add_todo":
      return {
        ...state,
        todosList: [...state.todosList, value],
      };
    case "delete_todo":
      return {
        ...state,
        todosList: state.todosList.filter((t) => t.id !== value),
      };
    case "status_change":
      return {
        ...state,
        todosList: state.todosList.map((todo) => {
          return todo.id === value.id ? value : todo;
        }),
      };
    default:
      throw Error("Unknown action.");
  }
}

export default function AddTodo() {
  const [state, dispatch] = useReducer(reducer, { todosList: [] });
  // const todosList = [];

  useEffect(() => {
    const todosListCall = async () => {
      try {
        const {
          data: { todos },
        } = await axios.get("https://dummyjson.com/todos?limit=5");
        initialLoad(todos);
      } catch (error) {
        console.log(error);
      }
    };
    todosListCall();
  }, []);

  function initialLoad(todos) {
    dispatch({
      event: "initial_load",
      value: todos,
    });
  }

  function addTodo(event, newTodo) {
    event.preventDefault();
    dispatch({
      event: "add_todo",
      value: {
        id: state.todosList.length + 1,
        todo: newTodo,
        completed: false,
        userId: Math.ceil(Math.random() * 100 - 1),
      },
    });
  }

  function deleteTodo(todoId) {
    dispatch({
      event: "delete_todo",
      value: todoId,
    });
  }

  function todoStatusChange(todo) {
    dispatch({
      event: "status_change",
      value: todo,
    });
  }

  // function newTodoText(ev) {
  //   dispatch({
  //     event: "on_change",
  //     value: ev.target.value,
  //   });
  // }

  return (
    <div>
      <TodoInputForm addNew={addTodo} />
      <Todo
        todos={state.todosList}
        onDelete={deleteTodo}
        onChange={todoStatusChange}
      />
    </div>
  );
}
