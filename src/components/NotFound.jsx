import styled from "styled-components";
import NotFoundGreenie from "../assets/404image.png";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const NotFoundImage = styled.img`
  max-width: 650px;
  width: 80%;
  height: auto;
  margin-top: -100px;
`;

const HiddenNotFoundText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundImage src={NotFoundGreenie} alt="404 Not Found 이미지" />
      <HiddenNotFoundText role="alert">
        404 페이지를 찾을 수 없습니다
      </HiddenNotFoundText>
    </NotFoundContainer>
  );
};

export default NotFound;
