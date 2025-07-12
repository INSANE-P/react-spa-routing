import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getAllArticles = async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  return response.data.articles;
};

export const getArticlesByCategory = async (category) => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  return response.data.articles;
};
