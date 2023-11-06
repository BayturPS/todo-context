import { createContext, useContext, useReducer } from "react";
const LanguageContext = createContext();

function lannguageReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return action.payload;
    default:
      return state;
  }
}
export const LanguageProvider = ({ children }) => {
  const [language, dispatch] = useReducer(lannguageReducer, "en");

  const lang = {
    en: {
      title: "Todo App",
      btnAdd: "Add Todo",
      btnEdit: "Edit",
      btnDelete: "Delete",
      btnLang: "Change Language",
      btnMode: "Dark Mode",
      btnSave: "Save",
      btnCancel: "Cancel",
    },
    ru: {
      title: "Туду Прог",
      btnAdd: "Доб-Туду",
      btnEdit: "Изменить",
      btnDelete: "Удалить",
      btnLang: "Изменить Язык",
      btnMode: "Темный Режим",
      btnSave: "Сохранить",
      btnCancel: "Отмена",
    },
  };

  const currentLang = lang[language];

  return (
    <LanguageContext.Provider value={{ language, currentLang, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
