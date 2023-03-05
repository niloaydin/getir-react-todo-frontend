import React from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import { useSelector } from "react-redux";

function App() {
  //get the state of isEditing from redux
  const isEditing = useSelector((state) => state.todos.isEditing);

  return (
    <div>
      {/* In here i am checking if somebody is opened the edit todo modal, that way i can give another class */}
      <div className={!isEditing ? "App" : "App edited"} data-testid="app_id">
        <TodoForm data-testid="todoForm" />
        <TodoList data-testid="todoList" />
      </div>
    </div>
  );
}

export default App;
