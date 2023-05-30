import styled from "styled-components";

import PromiseBg from "assets/images/promise.png";
import { FONT_COLOR_OPTION, FONT_OPTION } from "utils/constant";
import React, { useEffect, useRef } from "react";

function WishLabel({ info, changeHandler, editable = false }) {
  const { value, font, color } = info;

  const onPressEnterHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Container>
      <InputArea
        suppressContentEditableWarning
        contentEditable={editable ? true : false}
        onKeyDown={editable ? onPressEnterHandler : null}
        onInput={editable ? changeHandler : null}
        font={FONT_OPTION[font]}
        color={FONT_COLOR_OPTION[color]}
      >
        {value}
      </InputArea>
      <img src={PromiseBg} alt="" />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const InputArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  border: none;

  font-family: ${({ font }) => font};
  font-weight: bold;
  font-size: 18px;

  color: ${({ color }) => color};
  text-align: center;

  padding: 12px;

  overflow-y: hidden;

  // focus outline
  &:focus {
    outline: 2px solid var(--pink-200);
  }

  @media (min-width: 500px) {
    font-size: 21px;
  }
`;

export default WishLabel;
