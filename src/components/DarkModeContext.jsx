import React, { createContext, useReducer, useContext } from "react";

const DarkModeContext = createContext();

function darkModeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return state === "light" ? "dark" : "light";
    default:
      return state;
  }
}

export const DarkModeProvider = ({ children }) => {
  const [darkMode, dispatch] = useReducer(darkModeReducer, "light");
  return (
    <DarkModeContext.Provider value={{ darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if(context){}

    return context
}