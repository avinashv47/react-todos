import { ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default function Todo({ todos, onDelete }) {
  return (
    <div>
      <ListGroup>
        {todos.map((todo) => {
          return (
            <ListGroup.Item key={todo.id}>
              <span>
                <input type="checkbox" />
              </span>
              {todo.todo}{" "}
              <span onClick={() => onDelete(todo.id)}>
                <Icon.Trash />
              </span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
