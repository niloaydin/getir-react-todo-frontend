import {
  Card,
  Popconfirm,
  Button,
  Input,
  Modal,
  notification,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./Css/TodoItem.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  editTodo,
  changeIsEditing,
} from "../redux/features/todoSlice";
import { useState } from "react";

const TodoItem = ({ todo }) => {
  //Set the default value to todo's text, so when edit is entered the input can hold the existing text
  const [value, setValue] = useState(todo.text);

  const dispatch = useDispatch();
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  //Getting states from redux
  const isEditing = useSelector((state) => state.todos.isEditing);
  const editingId = useSelector((state) => state.todos.editingId);
  const loadingEditing = useSelector((state) => state.todos.loadingEditing);

  //Using deleteTodo function I wrote in redux, I give the id of the todo I want to delete
  const handleDelete = () => {
    dispatch(deleteTodo(todo));
    notification.success({
      message: `You've sucessfully deleted the todo!`,
      placement: "topRight",
      duration: 1.5,
    });
  };

  //Using editTodo function I wrote in redux, I use todo's existing properties;
  //however, give new id and text data
  const handleEdit = () => {
    dispatch(
      editTodo({
        ...todo,
        id: editingId,
        text: value,
      })
    );
  };

  //Using toggleTodo function I wrote in redux, I use todo's existing properties;
  //but I reverse the completed status
  const handleToggle = () => {
    dispatch(
      toggleTodo({
        ...todo,
        completed: !todo.completed,
      })
    );
  };

  //Using changeIsEditing function I wrote in redux, I reverse isEditing's state,
  //and I give todo's id for editingIs's state value
  const handleIsEditing = () => {
    dispatch(
      changeIsEditing({
        isEditing: !isEditing,
        editingId: todo._id,
      })
    );
  };

  // if todo id equals to editingId and if isEditing is true, show the modal
  return isEditing && editingId === todo._id ? (
    <div key={todo?.id} className="edit_modal">
      {!loadingEditing && (
        <Modal
          title="Update the Todo!"
          open={isEditing}
          footer={[]}
          onCancel={handleIsEditing}
          className="deneme"
        >
          <Input.Group compact className="edit_form">
            <Input
              style={{ width: "60%" }}
              value={value}
              defaultValue={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleEdit(e);
                }
              }}
              className="edit_form input"
            />

            <Button
              type="primary"
              disabled={!value}
              style={{ width: "20%" }}
              onClick={handleEdit}
              className="edit_form button"
            >
              Edit
            </Button>
          </Input.Group>
        </Modal>
      )}
      <div>{loadingEditing && <Spin indicator={antIcon} />}</div>
    </div>
  ) : (
    <div className="todo_item_container">
      <Card className={!todo.completed ? "todo_card" : "todo_card completed"}>
        <div className="todo_item">
          <div className="todo_item_and_input">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              style={{ width: "18px", height: "18px" }}
            />
            <span>{todo.text}</span>
          </div>

          <div className="todo_icons">
            <div>
              <Popconfirm
                title="Delete the todo"
                description="Are you sure to delete this todo?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined
                  style={{
                    fontSize: "22px",
                    color: "rgba(210, 73, 35, 1)",
                  }}
                  className="todo_icons delete"
                />
              </Popconfirm>
            </div>

            <div>
              <EditOutlined
                style={{ fontSize: "22px", color: "black" }}
                onClick={handleIsEditing}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TodoItem;
