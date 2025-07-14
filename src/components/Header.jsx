import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/darkModeSlice";
import { categories } from "../constants/categories";
import styled from "styled-components";
import LogoImage from "../assets/greedynewsicon.jpg";
import BatSignalIcon from "../assets/batSignal.png";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const HiddenSiteTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

const HomeLink = styled(NavLink)`
  margin-bottom: 8px;
`;

const SiteLogo = styled.img`
  width: 300px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const CategoryNav = styled.nav`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const CategoryLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.linkText};
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 4px;

  font-size: 1.2rem;
  font-weight: 600;

  &.active {
    color: #fff;
    background-color: #317252;
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverBg};
    color: ${({ theme }) => theme.hoverText};
  }
`;

const DarkModeButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.buttonBg};
  background-image: url(${BatSignalIcon});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.4s ease,
    transform 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBg || "#FFD700"};
    transform: scale(1.1);
  }
`;
const HiddenDarkModeState = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <HeaderContainer>
      <HiddenSiteTitle>Greedy News</HiddenSiteTitle>
      <HomeLink to="/">
        <SiteLogo src={LogoImage} alt="Greedy News Logo" />
      </HomeLink>
      <CategoryNav>
        {categories.map((category) => (
          <CategoryLink
            key={category}
            to={category === "All" ? "/" : `/${category.toLowerCase()}`}
          >
            {category}
          </CategoryLink>
        ))}
      </CategoryNav>
      <DarkModeButton
        aria-label="다크 모드 버튼"
        onClick={() => dispatch(toggleDarkMode())}
      >
        <HiddenDarkModeState>
          현재 상태: {isDarkMode ? "다크 모드" : "라이트 모드"}
        </HiddenDarkModeState>
      </DarkModeButton>
    </HeaderContainer>
  );
};

export default Header;
