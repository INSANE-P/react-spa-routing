import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles, getArticlesByCategory } from "../api/api";

const initialState = {
  articles: [],
  status: "idle",
  error: null,
  selectedCategory: "all",
};

export const fetchAllArticles = createAsyncThunk(
  "articles/fetchAll",
  async () => {
    const data = await getAllArticles();
    return data;
  }
);

export const fetchArticlesByCategory = createAsyncThunk(
  "articles/fetchByCategory",
  async (selectedCategory) => {
    const data = await getArticlesByCategory(selectedCategory);
    return data;
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchArticlesByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = articleSlice.actions;
export default articleSlice.reducer;
