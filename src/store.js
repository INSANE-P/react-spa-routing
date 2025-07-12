import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";
import articleReducer from "./features/articleSlice";
import darkModeReducer from "./features/darkModeSlice";

const persistConfig = {
  key: "darkMode",
  storage,
};
const persistedDarkModeReducer = persistReducer(persistConfig, darkModeReducer);

export const store = configureStore({
  reducer: { darkMode: persistedDarkModeReducer, article: articleReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
