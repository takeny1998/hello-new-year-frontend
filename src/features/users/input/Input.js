import styled from "styled-components";
import PropTypes from "prop-types";

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
