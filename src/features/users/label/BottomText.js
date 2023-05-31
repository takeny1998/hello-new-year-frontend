import styled from "styled-components";

const BottomText = ({ children }) => {
  return <BottomTextStyle>{children}</BottomTextStyle>;
};

const BottomTextStyle = styled.div`
  font-family: nanumRound;
  font-weight: 600;
  font-size: 16px;
`;

export default BottomText;
