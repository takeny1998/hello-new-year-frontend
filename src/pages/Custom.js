import React, { useCallback, useEffect, useState } from 'react'
import ButtonItem from '../components/ButtonItem'
import Container from '../components/Container'
import Logo from '../components/Logo'
import {
  ACCESSORY_ICON_OPTION,
  FONT_COLOR_OPTION,
  FONT_OPTION,
  FONT_TYPO_OPTION,
  RABBIT_COLOR_OPTION,
  RABBIT_INIT_STATE,
  SITE_NAME,
  WISH_INIT_STATE,
} from '../utils/constant'
import { SmallText } from './InviteLetter'
import { Wrapper } from './Main'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import MyRabbit from '../components/MyRabbit'
import setMetaTags from '../utils/meta'

import BG1Icon from '../assets/images/i_bg1.png'
import BG2Icon from '../assets/images/i_bg2.png'
import useHttp from 'hooks/use-http'
import { WishLabel } from 'features/wish'
import { LoadingModal } from 'features/ui'

function Custom() {
  React.useEffect(() => {
    setMetaTags(`내 화면 꾸미기 - ${SITE_NAME}`)
  }, [])

  const { uuid, token } = useSelector(state => state.loginState)

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [wishInfo, setWishInfo] = useState(WISH_INIT_STATE);
  const [rabbitInfo, setRabbitInfo] = useState(RABBIT_INIT_STATE);

  const { isFetchLoading, fetchError, sendRequest: fetch} = useHttp();
  const { isSubmitLodaing, submitError, sendRequest: submit} = useHttp();
  
  useEffect(() => {
    const applyCustomData = (data) => {
      const [
        wishFont, wishColor, rabbitColor, rabbitAcc, backgroundIndex
      ] = data.custom.split(';');

      const wishInfo = {
        value: data.wish,
        font: wishFont,
        color: wishColor,
      }

      const rabbitInfo = {
        color: rabbitColor,
        acc: rabbitAcc,
      }

      setBackgroundIndex(backgroundIndex);
      setWishInfo(wishInfo);
      setRabbitInfo(rabbitInfo);
    }

    fetch(
      `/api/rabbit/mypage/${uuid}/custom`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      applyCustomData
    )
  }, [uuid, token])

  const submitHandler = async () => {
    const complete = ({ nickName }) => {
      alert(`${nickName}님의 설정이 저장되었습니다.`);
      window.location.reload();
    }

    submit(
      `/api/rabbit/mypage/${uuid}/custom`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: {
          wish: wishInfo.value,
          custom: `${wishInfo.font};${wishInfo.color};${rabbitInfo.color};${rabbitInfo.acc};${backgroundIndex}`,
        }
      },
      complete
    )
  }

  const backgroundChangeHandler = (value) => {
    setBackgroundIndex(value);
  }


  const wishColorChangeHandler = (value) => {
    setWishInfo((prevState) => { 
      return { ...prevState, color: value };
    });
  }

  const wishFontChangeHandler = (value) => {
    setWishInfo((prevState) => { 
      return { ...prevState, font: value };
    });
  }

  const wishValueChangeHandler = useCallback((event, ref) => {
    setWishInfo((prevState) => {
      return { ...prevState, value: event.target.innerText };
    })
  }, []);

  
  const rabbitColorChangeHandler = (value) => {
    setRabbitInfo((prevState) => { 
      return { ...prevState, color: value };
    });
  }

  const rabbitAccChangeHandler = (value) => {
    setRabbitInfo((prevState) => { 
      return { ...prevState, acc: value };
    });
  }

  return (
    <>
    <Container customBg={backgroundIndex}>
      <Wrapper gap={4}>
        <Logo sx={1.75} />
        <Option>
          <OptionLabel>배경화면</OptionLabel>
          <OptionWrapper>
            <IconOption src={BG1Icon} onClick={() => backgroundChangeHandler(0)} />
            <IconOption src={BG2Icon} onClick={() => backgroundChangeHandler(1)} />
          </OptionWrapper>
        </Option>
        <Wrapper gap={1.5}>
          <SmallText>2023년 새해 소망을 적어보세요!</SmallText>
          <WishLabel
            info={wishInfo}
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

          <MyRabbit info={rabbitInfo} />

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
  )
}

const Option = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  align-items: flex-end;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--brown-100);
`

const OptionLabel = styled.div`
  font-family: nanumRound;
  font-weight: bold;
  font-size: 18px;
`

const OptionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;

  > * {
    cursor: pointer;
  }
`

const IconOption = styled.img`
  width: 32px;
  object-fit: cover;
  border-radius: 9999px;
  border: 1px solid var(--pink-100);
`

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background-color: ${({ color }) => color};
  border: 1px solid var(--pink-100);
`

export default Custom
