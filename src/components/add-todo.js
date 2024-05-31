import axios from "axios";

import { useReducer, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Todo from "./todo";

function reducer(state, action) {
  const { event, value } = action;
  if (event === "initial_load") {
    return {
      ...state,
      todosList: value,
    };
  }
  if (event === "on_change") {
    return {
      ...state,
      todoText: value,
    };
  }
  if (event === "add_todo") {
    return {
      ...state,
      todosList: [...state.todosList, value],
    };
  }
  if (event === "delete_todo") {
    return {
      ...state,
      todosList: state.todosList.filter(t => t.id !== value),
    };
  }
  throw Error("Unknown action.");
}

export default function AddTodo() {
  //   const [todosList, setTodosList] = useState([]);
  //   useEffect(() => {
  //     const getTodos = async () => {
  //       try {
  //         const {
  //           data: { todos },
  //         } = await axios.get("https://dummyjson.com/todos?limit=5");
  //         console.log(todos);
  //         setTodosList(todos);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getTodos();
  //   }, []);

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
    // event.stopPropagation();
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
    console.log('delete todo >> ', todoId);
    dispatch({
      event: 'delete_todo',
      value: todoId
    })
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
      <Todo todos={state.todosList} onDelete={deleteTodo}/>
    </>
  );
}
