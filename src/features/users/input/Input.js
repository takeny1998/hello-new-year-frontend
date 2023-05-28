import styled from "styled-components";

const Input = styled.input`
  width: 75%;
  padding: 18px;
  color: var(--brown);

  font-family: nanumRound;
  font-weight: bold;
  font-size: 18px;
  text-align: center;

  border: none;
  border-radius: 9px;
  filter: drop-shadow(3px 3px 2px var(--light-300));

  :focus {
    outline: 2px solid var(--pink-200);
  }

  ::placeholder {
    text-align: center;
    color: var(--brown-100);
  }
`

export default Input;