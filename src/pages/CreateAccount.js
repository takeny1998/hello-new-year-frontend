import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { SubTitle, Wrapper } from "./Main";

import { BottomText, Input } from "features/users";
import { Button, Link, LoadingModal } from "features/ui";

import Logo from "../components/Logo";
import Container from "../components/Container";
import setMetaTags from "../utils/meta";
import { SITE_NAME } from "../utils/constant";
import useHttp from "hooks/use-http";
import { useAuthInput } from "features/auth";
import {
  validateNickName,
  validateUserID,
  validatePassword,
} from "features/auth/join";

function CreateAccount() {
  useEffect(() => {
    setMetaTags(`회원가입 - ${SITE_NAME}`);
  }, []);

  const navigate = useNavigate();

  const { isLoading, sendRequest: submit } = useHttp();

  const {
    value: userID,
    isValid: userIDIsValid,
    error: userIDError,
    valueChangeHandler: userIDChangeHandler,
    inputBlurHandler: userIDBlurhandler,
  } = useAuthInput(validateUserID);

  const {
    value: nickName,
    isValid: nickNameIsValid,
    error: nickNameError,
    valueChangeHandler: nickNameChangeHandler,
    inputBlurHandler: nickNameBlurhandler,
  } = useAuthInput(validateNickName);

  const {
    value: password,
    isValid: passwordIsValid,
    error: passwordError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurhandler,
  } = useAuthInput(validatePassword);

  const formIsValid = userIDIsValid && nickNameIsValid && passwordIsValid;

  const submitHandler = (event) => {
    const complete = ({ nickName }) => {
      alert(`${nickName}님, 가입을 축하합니다.\n다시 로그인해 주세요.`);
      navigate("/");
    };

    if (formIsValid) {
      submit(
        "/api/users/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            userID: userID,
            password: password,
            nickName: nickName,
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
        <Wrapper gap={3}>
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
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={nickName}
              error={nickNameError}
              onChange={nickNameChangeHandler}
              onBlur={nickNameBlurhandler}
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
              회원가입
            </Button>
            <Link target="/login">
              <BottomText>계정이 있으신가요? 로그인</BottomText>
            </Link>
          </Wrapper>
        </Wrapper>
      </Container>
    </>
  );
}

export default CreateAccount;
