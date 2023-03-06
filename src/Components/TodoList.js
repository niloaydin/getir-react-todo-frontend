import React from "react";
import "./Css/TodoList.css";
import { Col, Row } from "antd";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const TodoList = () => {
  //Get the states from redux
  const todos = useSelector((state) => state.todos.todos);
  const isDeleting = useSelector((state) => state.todos.isDeleting);
  const isAddingTodo = useSelector((state) => state.todos.isAddingTodo);

  const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;
  console.log("AAA", todos);

  return (
    <div className="todo_list_container">
      {!isDeleting && !isAddingTodo && (
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 14, offset: 5 }}
            lg={{ span: 12, offset: 6 }}
            className="active_todo_board"
          >
            <h1> TODO BOARD</h1>
            {/* Map through all the todos and give todo as a props */}
            <div>
              {todos?.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
              ))}
            </div>
          </Col>
        </Row>
      )}
      <div>{(isDeleting || isAddingTodo) && <Spin indicator={antIcon} />}</div>
    </div>
  );
};

export default TodoList;
