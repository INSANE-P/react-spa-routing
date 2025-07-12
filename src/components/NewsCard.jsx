import { useSelector } from "react-redux";
import styled from "styled-components";
import placeHolderImage from "../assets/placeHolderImages";

const NewsCardWrapper = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.cardShadow};
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.cardText};
  cursor: pointer;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    transform: scale(1.03);
    background-color: ${({ theme }) => theme.cardHoverBg};
    color: ${({ theme }) => theme.cardHoverText};
  }
`;

const NewsCardImage = styled.img`
  width: 270px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 16px;
  flex-shrink: 0;
`;

const NewsCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewsCardTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 8px 0;
`;

const NewsCardDescription = styled.p`
  font-size: 1rem;
  margin: 0 0 8px 0;
`;

const NewsCardAuthor = styled.p`
  font-size: 0.75rem;
  margin: 0;
`;

const NewsCard = ({ article }) => {
  const selectedCategory = useSelector(
    (state) => state.article.selectedCategory
  );

  const handleNewsCardClick = () => {
    window.location.href = article.url;
  };

  return (
    <NewsCardWrapper onClick={handleNewsCardClick}>
      <NewsCardImage
        src={article.urlToImage || placeHolderImage[selectedCategory]}
        alt={article.title || "Unknown"}
        onError={(e) => {
          e.currentTarget.src = placeHolderImage[selectedCategory];
        }}
      />
      <NewsCardContent>
        <NewsCardTitle>{article.title || "No Title"}</NewsCardTitle>
        <NewsCardDescription>
          {article.description || "No Description"}
        </NewsCardDescription>
        <NewsCardAuthor>{article.author || "Anonymous"}</NewsCardAuthor>
      </NewsCardContent>
    </NewsCardWrapper>
  );
};

export default NewsCard;
