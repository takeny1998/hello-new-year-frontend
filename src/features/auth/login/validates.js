export const validateUserID = (userID) => {
  let error = "";
  if (userID.length === 0) {
    error = "아이디가 입력되지 않았습니다.";
  } else if (userID.length > 12) {
    error = "아이디는 12자 까지 입력 가능합니다.";
  }
  return error;
};

export const validatePassword = (password) => {
  let error = "";
  if (password.length === 0) {
    error = "비밀번호가 입력되지 않았습니다.";
  } else if (password.length > 20) {
    error = "비밀번호는 20자까지 입력 가능합니다.";
  }
  return error;
};
