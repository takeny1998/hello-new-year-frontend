import React from 'react'

import { useNavigate } from 'react-router-dom'

import { SubTitle, Wrapper } from './Main'

import { Input, useForm, validateJoin } from 'features/users'
import { Button, Link, LoadingModal } from 'features/ui'

import Logo from '../components/Logo'
import Container from '../components/Container'
import setMetaTags from '../utils/meta'
import { SITE_NAME } from '../utils/constant'
import { BottomText } from './Login'
import useHttp from 'hooks/use-http'

const JOIN_INIT_VALUES = {
  userID : '',
  nickname: '',
  password: '',
  passwordRepeat: '',
}

function CreateAccount() {
  React.useEffect(() => {
    setMetaTags(`회원가입 - ${SITE_NAME}`)
  }, []);

  const navigate = useNavigate();

  const {isLoading, sendRequest: submit} = useHttp();

  const { changeHandler, submitHandler } = useForm(JOIN_INIT_VALUES);

  
  const attemptJoin = ({ userID, password, nickname }) => {
    const complete = ({ nickName }) => {
      alert(`${nickName}님, 가입을 축하합니다.\n다시 로그인해 주세요.`);
      navigate('/');
    };

    submit(
      '/api/users/join',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          userID: userID,
          password: password,
          nickName: nickname,
        },
      },
      complete
    );
  };

  return (
    <>
    {isLoading && <LoadingModal />}
    <Container>
      <Wrapper gap={3}>
        <Logo />
        <Wrapper gap={1.2}>
          <SubTitle>환영합니다!</SubTitle>
          <Input
            type="text"
            name="userID"
            placeholder="아이디"
            autocomplete="off"
            onChange={changeHandler}
          />
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임"
            autocomplete="off"
            onChange={changeHandler}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            autocomplete="off"
            onChange={changeHandler}
          />
          <Input
            type="password"
            name="passwordRepeat"
            placeholder="비밀번호 확인"
            autocomplete="off"
            onChange={changeHandler}
          />
        </Wrapper>
        <Wrapper>
          <Button onClick={
            (event) => {
              submitHandler(event, attemptJoin, validateJoin);
            }
          }>
            회원가입
          </Button>
          <Link target="/login">
            <BottomText>계정이 있으신가요? 로그인</BottomText>
          </Link>
        </Wrapper>
      </Wrapper>
    </Container>
    </>
  )
}

export default CreateAccount
