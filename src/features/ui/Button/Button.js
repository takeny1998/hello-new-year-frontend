import styled from "styled-components";
import PropTypes from "prop-types";

function Button({
  onClick,
  disabled = false,
  background = "--pink-200",
  children,
}) {
  return (
    <ButtonLayout
      disabled={disabled}
      type="button"
      background={background}
      onClick={onClick}
    >
      {children}
    </ButtonLayout>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  background: PropTypes.string,
};

const ButtonLayout = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60%;
  height: 60px;

  border: 5px double var(--light-100);
  border-radius: 9999px;

  font-family: nanumRound;
  font-weight: bold;
  font-size: 18px;

  background: var(${(props) => props.background});
  color: var(--brown);

  cursor: pointer;

  :disabled {
    background-color: #ccc;
    color: #292929;
    cursor: not-allowed;
  }
`;

export default Button;
