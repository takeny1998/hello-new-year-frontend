import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonItem from "../components/ButtonItem";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { Wrapper } from "./Main";
import MyRabbit from "../components/MyRabbit";
import setMetaTags from "../utils/meta";
import { SITE_NAME } from "../utils/constant";
import { useUserData } from "features/users";
import { WishLabel } from "features/wish";
import { LoadingModal } from "features/ui";

function InviteLetter() {
  const { uuid } = useParams();

  const navigate = useNavigate();

  const { isFetching, userData, fetchUserData } = useUserData();

  useEffect(() => {
    fetchUserData(uuid);
  }, [uuid]);

  React.useEffect(() => {
    setMetaTags(`${userData.nickName}님의 편지함 - ${SITE_NAME}`);
  }, [userData.nickName]);

  return (
    <>
      {isFetching && <LoadingModal />}
      <Container alt>
        <Wrapper gap={2}>
          <Logo sx={1.75} />
          <SmallText>
            {userData.nickName}님에게 응원의 편지를 적어주세요.
          </SmallText>
          <WishLabel info={userData.wishInfo} />
        </Wrapper>

        <MyRabbit info={userData.rabbitInfo} />

        <ButtonItem
          onClick={() => navigate("send/", { state: userData.nickName })}
        >
          편지 작성하기
        </ButtonItem>
      </Container>
    </>
  );
}

export const SmallText = styled.div`
  font-family: nanumRound;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: var(--brown);
  text-align: center;
`;

export default InviteLetter;
