import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../features/articleSlice";
import NewsCard from "./NewsCard";
import { availableURLCategories } from "../constants/categories";
import styled from "styled-components";
import { toast } from "react-toastify";

const MessageContainer = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

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
      toast("유효하지 않은 URL입니다. 메인으로 이동합니다.", {
        position: "top-center",
        limit: 1,
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true,
        style: {
          backgroundColor: "#317252",
          color: "#ffffff",
          fontWeight: "bold",
          borderRadius: "8px",
        },
      });
      navigate("/", { replace: true });
    }
  }, [category]);

  if (status === "loading") {
    return (
      <MessageContainer role="status">
        뉴스 기사 불러오는 중...
      </MessageContainer>
    );
  }
  if (status === "failed") {
    return (
      <MessageContainer role="alert">
        뉴스 기사 불러오기 실패 ERROR: {error}
      </MessageContainer>
    );
  }
  if (articles.length === 0) {
    return (
      <MessageContainer role="status">
        해당 카테고리 관련 뉴스 기사가 없습니다.
      </MessageContainer>
    );
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
