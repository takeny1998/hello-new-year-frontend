import React, { useEffect, useRef } from "react";
import ButtonItem from "../components/ButtonItem";
import Container from "../components/Container";
import Logo from "../components/Logo";
import {
  ACCESSORY_ICON_OPTION,
  FONT_COLOR_OPTION,
  FONT_TYPO_OPTION,
  RABBIT_COLOR_OPTION,
  SITE_NAME,
} from "../utils/constant";
import { SmallText } from "./InviteLetter";
import { Wrapper } from "./Main";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MyRabbit from "../components/MyRabbit";
import setMetaTags from "../utils/meta";

import BG1Icon from "../assets/images/i_bg1.png";
import BG2Icon from "../assets/images/i_bg2.png";
import useHttp from "hooks/use-http";
import { WishLabel } from "features/wish";
import { LoadingModal } from "features/ui";
import { useUserData } from "features/users";

const Custom = () => {
  const { uuid, token } = useSelector((state) => state.loginState);
  const { isLoading: isSubmitting, sendRequest: submit } = useHttp();
  const { isFetching, userData, fetchUserData, dispatchUserData } =
    useUserData();

  useEffect(() => {
    setMetaTags(`내 화면 꾸미기 - ${SITE_NAME}`);
  }, []);

  useEffect(() => {
    fetchUserData(uuid);
  }, [uuid]);

  /*
    TODO: Custom 검증 Logic 추가하기
    - 현재 Custom form에 값 검증 코드가 없음
    - 백엔드 개발자와 유효값을 정한 뒤, 개발 필요
  */
  const submitHandler = async () => {
    const complete = ({ nickName }) => {
      alert(`${nickName}님의 설정이 저장되었습니다.`);
      window.location.reload();
    };

    const { backgroundIndex, wishInfo, rabbitInfo } = userData;

    submit(
      `/api/rabbit/mypage/${uuid}/custom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          wish: userData.wishInfo.value,
          custom: `${wishInfo.font};${wishInfo.color};${rabbitInfo.color};${rabbitInfo.acc};${backgroundIndex}`,
        },
      },
      complete
    );
  };

  const backgroundChangeHandler = (value) => {
    dispatchUserData({ type: "SET_BACKGROUND", value });
  };

  const wishColorChangeHandler = (value) => {
    dispatchUserData({ type: "SET_WISH_INFO", key: "color", value });
  };

  const wishFontChangeHandler = (value) => {
    dispatchUserData({ type: "SET_WISH_INFO", key: "font", value });
  };

  const wishValueChangeHandler = (event) => {
    // 값이 변경될 때마다, 커서 위치가 자꾸 앞으로 가는 문제를 방지
    window.getSelection()?.collapse(event.target, 1);
    dispatchUserData({
      type: "SET_WISH_INFO",
      key: "value",
      value: event.target.innerText,
    });
  };

  const rabbitColorChangeHandler = (value) => {
    dispatchUserData({ type: "SET_RABBIT_INFO", key: "color", value });
  };

  const rabbitAccChangeHandler = (value) => {
    dispatchUserData({ type: "SET_RABBIT_INFO", key: "acc", value });
  };

  return (
    <>
      {(isFetching || isSubmitting) && <LoadingModal />}
      <Container customBg={userData.backgroundIndex}>
        <Wrapper gap={4}>
          <Logo sx={1.75} />
          <Option>
            <OptionLabel>배경화면</OptionLabel>
            <OptionWrapper>
              <IconOption
                src={BG1Icon}
                onClick={() => backgroundChangeHandler(0)}
              />
              <IconOption
                src={BG2Icon}
                onClick={() => backgroundChangeHandler(1)}
              />
            </OptionWrapper>
          </Option>
          <Wrapper gap={1.5}>
            <SmallText>2023년 새해 소망을 적어보세요!</SmallText>
            <WishLabel
              info={userData.wishInfo}
              editable={true}
              changeHandler={wishValueChangeHandler}
            />

            <Wrapper gap={1}>
              <Option>
                <OptionLabel>폰트</OptionLabel>
                <OptionWrapper>
                  {FONT_TYPO_OPTION.map((typo, index) => (
                    <IconOption
                      key={index}
                      src={typo}
                      onClick={() => wishFontChangeHandler(index)}
                    />
                  ))}
                </OptionWrapper>
              </Option>

              <Option>
                <OptionLabel>색상</OptionLabel>
                <OptionWrapper>
                  {FONT_COLOR_OPTION.map((color, index) => (
                    <ColorOption
                      key={index}
                      color={color}
                      onClick={() => wishColorChangeHandler(index)}
                    />
                  ))}
                </OptionWrapper>
              </Option>
            </Wrapper>
          </Wrapper>

          <Wrapper gap={2}>
            <SmallText>
              올해, 나만의 토끼를 꾸며보세요!
              <br />달 위상은 보유한 용돈만큼 늘어납니다!
            </SmallText>

            <MyRabbit info={userData.rabbitInfo} />

            <Option>
              <OptionLabel>색상</OptionLabel>
              <OptionWrapper>
                {RABBIT_COLOR_OPTION.map((color, index) => (
                  <ColorOption
                    key={index}
                    color={color}
                    onClick={() => rabbitColorChangeHandler(index)}
                  />
                ))}
              </OptionWrapper>
            </Option>
            <Option>
              <OptionLabel>악세서리</OptionLabel>
              <OptionWrapper>
                {ACCESSORY_ICON_OPTION.map((icon, index) => (
                  <IconOption
                    key={index}
                    src={icon}
                    onClick={() => rabbitAccChangeHandler(index)}
                  />
                ))}
              </OptionWrapper>
            </Option>
          </Wrapper>
        </Wrapper>
        <ButtonItem onClick={() => submitHandler()}> 커스텀</ButtonItem>
      </Container>
    </>
  );
};

const Option = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  align-items: flex-end;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--brown-100);
`;

const OptionLabel = styled.div`
  font-family: nanumRound;
  font-weight: bold;
  font-size: 18px;
`;

const OptionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;

  > * {
    cursor: pointer;
  }
`;

const IconOption = styled.img`
  width: 32px;
  object-fit: cover;
  border-radius: 9999px;
  border: 1px solid var(--pink-100);
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background-color: ${({ color }) => color};
  border: 1px solid var(--pink-100);
`;

export default Custom;
