import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout, setState } from "../../utils/reducers/loginState";

import { Wrapper } from "../Main";

import Logo from "../../components/Logo";
import MaterialIcon from "../../components/MaterialIcon";

import { WishLabel } from "features/wish";

import SmallButtonItem from "../../components/SmallButtonItem";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ResponseError } from "../../utils/error";
import MoneyInfo from "./LoginMain/MoneyInfo";
import { setInfo } from "../../utils/reducers/infoState";
import MyRabbit from "../../components/MyRabbit";
import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import HelpModal, { Content, SmallContent } from "../../components/HelpModal";

import { freeLoading, setLoading } from "../../utils/reducers/loadingState";
import Loading from "../../components/Loading";
import useHttp from "../../hooks/use-http";
import {
  CUSTOM_INIT_STATE,
  RABBIT_INIT_STATE,
  WISH_INIT_STATE,
} from "../../utils/constant";
import {
  ButtonWrapper,
  LetterModal,
  LoadingModal,
  MainContainer,
} from "features/ui";
import { useUserData } from "features/users";

function LoginMain() {
  const { uuid } = useSelector((state) => state.loginState);
  const dispatch = useDispatch();

  const [isLetterOpen, setLetterOpen] = useState(true);

  const letterHandler = () => {
    setLetterOpen(false);
  };

  //   money: 0,
  //   wish: WISH_INIT_STATE,
  //   rabbit: RABBIT_INIT_STATE,
  // });

  // useEffect(() => {
  //   const applyUserData = (data) => {
  //     const [
  //       wishFont,
  //       wishColor,
  //       rabbitColor,
  //       rabbitAcc,
  //     ] = data.custom.split(';');

  //     const wishInfo = {
  //       value: data.wish,
  //       font: wishFont,
  //       color: wishColor,
  //     }

  //     const rabbitInfo = {
  //       color: rabbitColor,
  //       acc: rabbitAcc,
  //     }
  //     setUserData({money: data.money, wish: wishInfo, rabbit: rabbitInfo});
  //   }

  //   fetch(`/api/rabbit/mypage/${uuid}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //     applyUserData
  //   );
  // }, [uuid, token]);
  const { isFetching, userData, fetchUserData } = useUserData();

  useEffect(() => {
    fetchUserData(uuid);
  }, [uuid]);

  const navigate = useNavigate();
  return (
    <MainContainer backgroundIndex={userData.backgroundIndex}>
      {isFetching && <LoadingModal />}
      {isLetterOpen && <LetterModal onComfirm={letterHandler} />}
      {/* {parseInt(timeDiff[0]) === 0 &&
      parseInt(timeDiff[1]) === 0 &&
      parseInt(timeDiff[2]) === 0 ? (
        <ExpireModal />
      ) : helpOpen ? (
        <HelpModal setModalOpen={setHelpOpen} />
      ) : null} */}
      <Logo sx={1.75} />
      <Wrapper gap={2}>
        <ButtonWrapper>
          <CopyToClipboard
            text={`${window.location.href}letter/${uuid}`}
            onCopy={() => alert("링크가 성공적으로 복사되었습니다.")}
          >
            <SmallButtonItem background="--white" color="--pink">
              <MaterialIcon iconName="link" color="--pink" /> 링크 복사
            </SmallButtonItem>
          </CopyToClipboard>

          <SmallButtonItem onClick={() => navigate(`/custom`)}>
            내 화면 꾸미기
          </SmallButtonItem>

          <SmallButtonItem
            background="--pink-50"
            color="--pink-500"
            onClick={() => dispatch(logout())}
          >
            로그아웃
          </SmallButtonItem>
        </ButtonWrapper>

        <Wrapper gap={0.5}>
          <WishLabel info={userData.wishInfo} />
          <SmallTextButton onClick={() => {}}>
            혹시 설명이 필요하신가요? <Focus>도움말 열기</Focus>
          </SmallTextButton>
        </Wrapper>

        <MoneyInfo />

        <MyRabbit info={userData.rabbitInfo} />

        <Wrapper gap={2}>
          {/* <Label>
            편지 공개까지 {timeDiff[0]}일 {timeDiff[1]}시간 {timeDiff[2]}분
          </Label> */}

          <Label>2023년 새해 복 많이 받으세요!</Label>
          <Copyright>
            Copyright 2023. 구민구 박지용 양희범 박수진 이현무 김보영 이유진
            김수아 all rights reserved. contact: corleone@kakao.com
          </Copyright>
        </Wrapper>
      </Wrapper>
      <Loading />
    </MainContainer>
  );
}

const Label = styled.div`
  width: 100%;

  font-family: nanumRound;
  font-weight: bold;
  font-size: 18px;

  border-radius: 9999px;
  border: 1px solid var(--pink-100);

  text-align: center;

  background: white;
  color: var(--brown);
  padding: 18px;
`;

export const Copyright = styled.div`
  font-family: nanumRound;
  font-size: 11px;
  line-height: 15px;
  text-align: center;
  color: var(--brown-100);
  white-space: keep-all;
`;

const SmallTextButton = styled(Content)`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const Focus = styled.span`
  color: var(--pink);
  font-weight: 700;
`;
export default LoginMain;
