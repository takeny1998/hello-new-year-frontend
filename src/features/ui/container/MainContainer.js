import styled from "styled-components";
import { BACKGROUND_OPTION } from "utils/constant";

const MainContainer = ({ backgroundIndex = 0, children }) => {
  return (
    <MainLayout>
      <Content backgroundIndex={backgroundIndex}>{children}</Content>
    </MainLayout>
  );
};

const MainLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 380px;
  min-height: 100vh;
  height: auto;
`;

const Content = styled.div`
  min-width: 380px;
  max-width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 54px;
  align-items: center;
  gap: 36px;

  color: var(--brown);

  background: url(${({ backgroundIndex }) =>
    BACKGROUND_OPTION[backgroundIndex]});
  background-repeat: repeat;
  background-size: cover;

  @media (max-height: 560px) {
    height: auto;
  }

  @media (min-width: 500px) {
    width: 500px;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 54px 27px;
  }
`;

export default MainContainer;
