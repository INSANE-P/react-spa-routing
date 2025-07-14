import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllArticles,
  fetchArticlesByCategory,
} from "./features/articleSlice";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import Header from "./components/header";
import Main from "./components/main";
import NotFound from "./components/NotFound";

function App() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const selectedCategory = useSelector(
    (state) => state.article.selectedCategory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    selectedCategory === "all"
      ? dispatch(fetchAllArticles())
      : dispatch(fetchArticlesByCategory(selectedCategory));
  }, [selectedCategory]);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/:category?" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
