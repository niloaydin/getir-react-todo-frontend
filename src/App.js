import React from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "./redux/features/todoSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function App() {
  //get the state of isEditing from redux

  const dispatch = useDispatch();

  //Get all the todos from redux state when application is opened
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const isEditing = useSelector((state) => state.todos.isEditing);
  const isLoadingTodo = useSelector((state) => state.todos.isLoadingTodo);
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  return (
    <div>
      {/* In here i am checking if somebody is opened the edit todo modal, that way i can give another class */}
      {!isLoadingTodo && (
        <div className={!isEditing ? "App" : "App edited"} data-testid="app_id">
          <TodoForm data-testid="todoForm" />
          <TodoList data-testid="todoList" />
        </div>
      )}
      {isLoadingTodo && (
        <div className="App spin">
          <Spin indicator={antIcon} />
        </div>
      )}
    </div>
  );
}

export default App;
