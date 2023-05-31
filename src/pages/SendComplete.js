import { useNavigate } from "react-router-dom";
import ButtonItem from "components/ButtonItem";
import Logo from "components/Logo";
import { Wrapper } from "./Main";

import SendCompleteLabelBg from "assets/images/send.png";
import FlowerImg from "assets/images/flower.png";
import styled from "styled-components";
import { MainContainer } from "features/ui";

function SendComplete() {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Wrapper gap={4}>
        <Logo sx={1.75} />
        <SendCompleteLabel>
          <div>용돈과 편지를 성공적으로 전달했어요!</div>
          <img src={SendCompleteLabelBg} alt="" />
        </SendCompleteLabel>
        <Wrapper gap={2}>
          <SendCompleteText>
            <Flower src={FlowerImg} />
            <Content>
              함께 새해 다짐을 공유하고 응원을 받아보세요.
              <br />
              2023년, 토끼가 모두의 마음을 전달해드립니다.
            </Content>
            <Flower src={FlowerImg} />
          </SendCompleteText>
          <ButtonItem onClick={() => navigate("/sign-up")}>
            계정 만들러 가기
          </ButtonItem>
        </Wrapper>
      </Wrapper>
    </MainContainer>
  );
}

const SendCompleteLabel = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: none;
    border: none;
    color: var(--brown);
    text-align: center;

    font-family: nanumRound;
    font-weight: 800;
    font-size: 14px;
  }

  input:focus {
    outline: 2px solid var(--pink-200);
  }
`;

const SendCompleteText = styled.div`
  display: flex;
  align-items: center;
  gap: max(0.5rem, 9px);
`;

const Flower = styled.img`
  width: max(2rem, 36px);
`;

const Content = styled.div`
  font-family: nanumRound;
  font-weight: 600;
  font-size: max(0.6rem, 12px);
  line-height: max(1.1rem, 22px);
  text-align: center;
`;

export default SendComplete;
