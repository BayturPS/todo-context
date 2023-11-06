import React, { useContext, useState } from "react";
import { TodoContext, TodoProvider } from "./TodoContext";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import { useLanguage } from "./LanguageContext";
import { useDarkMode } from "./DarkModeContext";
import "../App.css";

const TodoApp = () => {
  const { state, dispatch: langDispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const { language, currentLang, dispatch: languageDispatch } = useLanguage();
  const { dispatch: darkDispatch, darkMode } = useDarkMode();

  const handleAddTodo = () => {
    if (text.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      langDispatch({ type: "ADD_TODO", payload: newTodo });
      setText("");
    }
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "ru" : "en";
    languageDispatch({ type: "CHANGE", payload: newLanguage });
  };

  return (
    <div className={`App ${darkMode}`}>
      <ModeBtns onClick={() => darkDispatch({ type: "TOGGLE_DARK_MODE" })}>
        {currentLang.btnMode}
      </ModeBtns>
      <ModeBtns onClick={handleLanguageChange}>{currentLang.btnLang}</ModeBtns>
      <AppContainer>
        <Title>{currentLang.title}</Title>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <AddBtn onClick={handleAddTodo}>{currentLang.btnAdd}</AddBtn>
      </AppContainer>
      <ListContainer>
        {state.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListContainer>
    </div>
  );
};

const AppWrapper = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);

export default AppWrapper;

const AppContainer = styled.div`
  max-width: 400px;
  margin: 25px;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  height: 150px;
  background-color: #e2e2e2;
  box-shadow: 0 0 15px 2px #4caf50;
`;

const ListContainer = styled.ul`
  width: 500px;
`;

const ModeBtns = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 5px;
  transition: 0.2s;
  &:active {
    transform: scale(0.95);
  }
`;

const Input = styled.input`
  width: 165px;
  height: 30px;
  border-radius: 7px;
  padding-left: 10px;
`;

const AddBtn = styled.button`
  margin-left: 5px;
  width: 90px;
  height: 30px;
  border-radius: 7px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0;
`;
