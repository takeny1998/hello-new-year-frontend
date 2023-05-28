import styled from "styled-components";
import PropTypes from "prop-types";

const BottomText = () => {
    return (
        <BottomTextStyle>처음이신가요? 계정 생성하기</BottomTextStyle>
    );
}

BottomText.propTypes = {
    target: PropTypes.string,
};

const BottomTextStyle = styled.div`
  font-family: nanumRound;
  font-weight: 600;
  font-size: 16px;
`

export default BottomText;