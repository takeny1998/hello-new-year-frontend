import styled from "styled-components";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import LinkItem from "../components/LinkItem";
import { Wrapper } from "./Main";
import { login } from "../utils/reducers/loginState";

import Logo from "../components/Logo";
import Container from "../components/Container";
import setMetaTags from "../utils/meta";
import { SITE_NAME } from "../utils/constant";
import { BottomText, Input } from "features/users";
import useHttp from "hooks/use-http";
import { Button, LoadingModal } from "features/ui";
import { validatePassword, validateUserID } from "features/auth/login";
import { useAuthInput } from "features/auth";

function Login() {
  React.useEffect(() => {
    setMetaTags(`로그인 - ${SITE_NAME}`);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, sendRequest: submit } = useHttp();

  const {
    value: userID,
    isValid: userIDIsValid,
    error: userIDError,
    valueChangeHandler: userIDChangeHandler,
    inputBlurHandler: userIDBlurhandler,
  } = useAuthInput(validateUserID);

  const {
    value: password,
    isValid: passwordIsValid,
    error: passwordError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurhandler,
  } = useAuthInput(validatePassword);

  const formIsValid = userIDIsValid && passwordIsValid;

  const submitHandler = (event) => {
    const complete = ({ nickName, jwt, uuid }) => {
      alert(`${nickName}님, 로그인에 성공하셨습니다.`);
      dispatch(login(jwt, uuid));
      navigate("/");
    };

    if (formIsValid) {
      submit(
        "/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            userID: userID,
            password: password,
          },
        },
        complete
      );
    }
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <Container>
        <Wrapper gap={4}>
          <Logo />
          <Wrapper gap={1.2}>
            <SubTitle>환영합니다!</SubTitle>
            <Input
              type="text"
              name="userID"
              placeholder="아이디"
              value={userID}
              error={userIDError}
              onChange={userIDChangeHandler}
              onBlur={userIDBlurhandler}
            />
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              error={passwordError}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurhandler}
            />
          </Wrapper>

          <Wrapper>
            <Button onClick={submitHandler} disabled={!formIsValid}>
              로그인
            </Button>
            <LinkItem target="/sign-up">
              <BottomText>처음이신가요? 계정 생성하기</BottomText>
            </LinkItem>
          </Wrapper>
        </Wrapper>
      </Container>
    </>
  );
}

const SubTitle = styled.div`
  font-family: nanumRound;
  font-weight: bold;
  font-size: 18px;

  white-space: nowrap;

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

export default Login;
