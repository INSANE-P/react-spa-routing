import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../features/articleSlice";
import NewsCard from "./NewsCard";
import { availableURLCategories } from "../constants/categories";
import styled from "styled-components";

const NewsCardListContainer = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;
const Main = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articles = useSelector((state) => state.article.articles);
  const status = useSelector((state) => state.article.status);
  const error = useSelector((state) => state.article.error);

  useEffect(() => {
    if (!category || availableURLCategories.includes(category)) {
      dispatch(setSelectedCategory(category || "all"));
    } else {
      console.log("유효하지 않은 URL 입니다. 메인으로 이동합니다.");
      navigate("/", { replace: true });
    }
  }, [category]);

  if (status === "loading") {
    return <div>뉴스 기사 불러오는 중...</div>;
  }
  if (status === "failed") {
    return <div>뉴스 기사 불러오기 실패 ERROR: {error}</div>;
  }
  return (
    <NewsCardListContainer>
      {articles
        .filter((article) => article.content && article.url)
        .map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
    </NewsCardListContainer>
  );
};

export default Main;
