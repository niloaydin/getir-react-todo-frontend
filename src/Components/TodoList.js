import React from "react";
import "./Css/TodoList.css";
import { Col, Row } from "antd";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "../redux/features/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  //Get all the todos from redux state when application is opened
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  //Get the states from redux
  const todos = useSelector((state) => state.todos.todos);

  return (
    <div className="todo_list_container">
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
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TodoList;
