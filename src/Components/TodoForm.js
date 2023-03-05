import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import "./Css/TodoForm.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/features/todoSlice";

const TodoForm = () => {
  const [value, setValue] = useState();

  const dispatch = useDispatch();

  //I used addTodo function coming from redux, and give the value of the text
  //to manipulate the todo's text property.
  //Then I set value's state to empty to have a blank input for every other todo
  const handleSubmit = () => {
    dispatch(
      addTodo({
        text: value,
      })
    );
    setValue("");
  };

  return (
    <div className="todo_form_container">
      <Form layout="vertical">
        <Input.Group compact className="todo_form_input_button">
          <Input
            placeholder="Add Todo"
            defaultValue=""
            allowClear
            value={value}
            onChange={(event) => setValue(event.target.value)}
            //This functions provides people sending todo with enter
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className="todo_form_input_button input"
          />

          <Button
            type="primary"
            disabled={!value}
            className="todo_form_input_button button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Input.Group>
      </Form>
    </div>
  );
};

export default TodoForm;
