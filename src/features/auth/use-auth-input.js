import { useState } from "react";

const useAuthInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // enteredNameIsValid는 enteredName의 최신 상태(state가 변경될 때)
  // 를 반영하므로, state가 아닌 constant로 관리해야 함
  const errorText = validateValue(enteredValue);
  const isValueValid = errorText === "";
  const hasError = !isValueValid && isTouched;

  const valueChangeHandler = (event) => {
    // React에서 state 업데이트는 비동기로 이뤄지므로
    // 이후에 검증하는 Logic을 사용한다면,
    // enteredName state 보다 event.target.value 사용해야함
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    // error를 표시해야 할 때만 errorText를 반환한다.
    isValid: isValueValid,
    error: hasError ? errorText : "",
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useAuthInput;
