import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import styled from "styled-components";
import { useLanguage } from "./LanguageContext";

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const { currentLang } = useLanguage();

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: editedText } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <TodoItemContainer>
      {isEditing ? (
        <>
          <EditInput type="text" value={editedText} onChange={handleChange} />
          <Button onClick={handleSave}>{currentLang.btnSave}</Button>
          <Button onClick={handleCancel}>{currentLang.btnCancel}</Button>
        </>
      ) : (
        <>
          <Checkbox
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <TodoText completed={todo.completed}>{todo.text}</TodoText>
          <Button onClick={handleEdit}>{currentLang.btnEdit}</Button>
          <Button onClick={handleDelete}>{currentLang.btnDelete}</Button>
        </>
      )}
    </TodoItemContainer>
  );
};
export default TodoItem;

const TodoItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  margin-left: 10px;
  margin-top: 0;
  padding: 8px 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: 0.2s;
  &:hover {
    background-color: #45a049;
  }
`;

const TodoText = styled.span`
  flex-grow: 1;
  font-size: 16px;
  color: #333;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  overflow: hidden;
  margin: 0;
`;

const EditInput = styled.input`
  margin-right: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 290px;
`;
