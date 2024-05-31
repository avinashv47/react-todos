import * as Icon from "react-bootstrap-icons";
import '../App.css';

export default function Todo({ todos, onDelete, onChange }) {
  return (
    <div>
      <ul className="todo-list-group">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={"list-item " + (todo.completed ? 'completed' : 'please-do')}>
              <span className="done-checkbox">
                <input type="checkbox" checked={todo.completed} onChange={(ev) => onChange({...todo, completed: ev.target.checked})} />
              </span>
              <span className="todo-text">{todo.todo}</span>
              <span className="delete-icon" onClick={() => onDelete(todo.id)}>
                <Icon.Trash />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
