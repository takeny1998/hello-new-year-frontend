import Container from "../components/Container";
import Logo from "../components/Logo";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import setMetaTags from "../utils/meta";
import { SITE_NAME } from "../utils/constant";
import styled from "styled-components";

import Money50000 from "assets/images/money-50000.png";
import Money10000 from "assets/images/money-10000.png";
import Money5000 from "assets/images/money-5000.png";
import Money1000 from "assets/images/money-1000.png";
import { SmallText } from "./InviteLetter";
import { Wrapper } from "./Main";
import MoneyButton from "components/MoneyButton";
import { validate } from "features/letter/send-letter";
import { Input } from "features/users";
import Letter from "components/Letter";
import { Button, LoadingModal } from "features/ui";
import useHttp from "hooks/use-http";
import ErrorText from "features/ui/text/ErrorText";

/*
TODO: Complete 모달 분리 작업
- Complete 모달을 따로 분리하고, portal을 활용해 최상위로 전송해야 함

TODO: Side-Effect 분리 작업
- 현재 돈을 선택하는 부분이 Component 최상위에 실행되고 있어 개선이 필요함

TODO: Money Component 개선 작업
- 현재 5000, 10000, .. 등 MoneyButton이 Hard Coding 되있음
- Money image Asset을 Component 내로 옮겨야 함
*/

function SendLetter() {
  const [money, setMoney] = useState();
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const { isLoading, sendRequest: submit } = useHttp();

  const [errorMessage, setErrorMessage] = useState();

  const { state: nickName } = useLocation();
  const { uuid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setMetaTags(`${nickName}님에게 편지쓰기 - ${SITE_NAME}`);
  }, []);

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value);
  };

  const moneyChangeHandler = (value) => {
    setMoney(value);
  };

  const contentChangeHandler = (event) => {
    setContent(event.target.innerText);
  };

  const submitHandler = (event) => {
    const completeHander = () => {
      alert("편지 전송에 성공했습니다.");
      navigate("complete/");
    };

    setErrorMessage("");
    const errors = validate(content, money, author);
    const formIsValid = Object.keys(errors).length === 0;

    if (formIsValid) {
      submit(
        `/api/letter/${uuid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { author, content, money },
        },
        completeHander
      );
    } else {
      let errorMessage = "";
      for (const key in errors) {
        errorMessage += errors[key] + "\n";
      }
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <Container>
        <Wrapper gap={2}>
          <Logo sx={1.75} target={`/letter/${uuid}`} />

          <SmallText>{nickName}님을 응원하는 마음만큼 용돈을 주세요!</SmallText>

          <MoneyWrapper>
            <MoneyButton
              src={Money50000}
              isActive={money === 50000}
              onClick={() => moneyChangeHandler(50000)}
            />
            <MoneyButton
              src={Money10000}
              isActive={money === 10000}
              onClick={() => moneyChangeHandler(10000)}
            />
            <MoneyButton
              src={Money5000}
              isActive={money === 5000}
              onClick={() => moneyChangeHandler(5000)}
            />
            <MoneyButton
              src={Money1000}
              isActive={money === 1000}
              onClick={() => moneyChangeHandler(1000)}
            />
          </MoneyWrapper>
        </Wrapper>
        <Input
          type="text"
          name="userID"
          placeholder="작성자"
          value={author}
          onChange={authorChangeHandler}
        />
        <SmallText>편지 내용은 최대 100자까지 작성해주세요!</SmallText>
        <Letter editable={true} onChange={contentChangeHandler} />

        {<ErrorText>{errorMessage}</ErrorText>}
        <Button onClick={submitHandler}>보내기</Button>
      </Container>
    </>
  );
}
export const SmallInput = styled(Input)`
  width: max(70%, 260px);
  padding: 14px;

  font-weight: 800;
  font-size: max(0.8rem, 14px);
  borderRadius: 9999px
  filter: none;
`;

const MoneyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: max(1rem, 18px);
  > div {
    position: relative;
  }
`;

export default SendLetter;
