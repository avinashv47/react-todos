import axios from "axios";

import { useReducer, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Todo from "./todo";

function reducer(state, action) {
  const { event, value } = action;
  switch (event) {
    case "initial_load":
      return {
        ...state,
        todosList: value,
      };
    case "on_change":
      return {
        ...state,
        todoText: value,
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
  const [state, dispatch] = useReducer(reducer, {
    todoText: "",
    todosList: [],
  });

  useEffect(() => {
    const todosList = async () => {
      try {
        const {
          data: { todos },
        } = await axios.get("https://dummyjson.com/todos?limit=5");
        initialLoad(todos);
      } catch (error) {
        console.log(error);
      }
    };
    todosList();
  }, []);

  function initialLoad(todos) {
    dispatch({
      event: "initial_load",
      value: todos,
    });
  }

  function addTodo(event) {
    event.preventDefault();
    dispatch({
      event: "add_todo",
      value: {
        id: state.todosList.length + 1,
        todo: state.todoText,
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
    console.log("change >> ", todo);
    dispatch({
      event: "status_change",
      value: todo,
    });
  }

  function newTodoText(ev) {
    dispatch({
      event: "on_change",
      value: ev.target.value,
    });
  }

  return (
    <>
      <Form onSubmit={addTodo}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter todo..."
                name="addTodoInput"
                onChange={newTodoText}
                value={state.todoText}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit">Add</Button>
          </Col>
        </Row>
      </Form>
      <Todo
        todos={state.todosList}
        onDelete={deleteTodo}
        onChange={todoStatusChange}
      />
    </>
  );
}
