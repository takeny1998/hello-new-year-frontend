import styled from "styled-components";
import PropTypes from "prop-types";

/*
TODO: password view icon 만들기

PC web browser(Edge)에서는 password 입력할 때,
입력값을 확인할 수 있는 view 버튼이 존재함.

그런데 모바일 safari나 chrome같은 타 browser는
view 버튼이 존재하지 않아 불편함 발생.

type이 password일 떄, view 버튼이 보이는 input을 새로
만들도록 하자.
*/
const Input = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  error = "",
}) => {
  const hasError = error !== "";
  return (
    <InputLayout>
      <input
        className={hasError ? "hasError" : null}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      <div className="errorText">{error}</div>
    </InputLayout>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

const InputLayout = styled.div`
  width: 75%;
  color: var(--brown);

  font-family: nanumRound;
  font-weight: bold;

  input {
    width: 100%;
    padding: 18px;

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
  }

  .hasError {
    outline: 2px solid var(--pink-500);
    background-color: var(--pink-50);
  }

  .errorText {
    padding: 9px;
    font-size: 14px;
    color: var(--pink-500);
  }
`;

export default Input;
