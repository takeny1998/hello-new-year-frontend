const { default: styled } = require("styled-components");

const ButtonWrapper = ({children}) => {
    return <ButtonWrapperStyle>{children}</ButtonWrapperStyle>
}

const ButtonWrapperStyle = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`;

export default ButtonWrapper;