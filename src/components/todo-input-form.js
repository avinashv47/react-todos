import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function TodoInputForm({ addNew }) {
  const [todoText, setTodoText] = useState("");
  return (
    <div>
      <Form onSubmit={(ev) => addNew(ev, todoText)} className="todo-form">
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter todo..."
                name="addTodoInput"
                onChange={(e) => setTodoText(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit">Add</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
