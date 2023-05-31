export const validateUserID = (userID) => {
  let error = "";
  /*  
      아이디 형식을 검증하기 위한 정규표현식
      1. 영문(대, 소문자), 숫자만 입력했는지 판별한다.
      2. 6글자 이상, 12글자 이하를 판별한다.
    */
  const userIDRegex = /^[A-Za-z0-9]{6,12}$/;

  if (userID.length === 0) {
    error = "아이디가 입력되지 않았습니다.";
  } else if (!userIDRegex.test(userID)) {
    error = "아이디는 6-12자의 영문, 숫자만 사용 가능합니다.";
  }
  return error;
};

export const validateNickName = (nickName) => {
  let error = "";
  /*
      닉네임 형식을 검증하기 위한 정규 표현식
      1. 한글, 영문(대소문자), 숫자, 기호만 입력했는지 판별한다.
      2. 한 글자 이상의 한글, 영문이 있는지 판별한다.
      3. 2자 이상, 20자 이하인지 판별한다.
    */
  const nicknameRegex = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9\s\p{P}]{2,20}$/u;

  if (nickName.length === 0) {
    error = "닉네임이 입력되지 않았습니다.";
  } else if (!nicknameRegex.test(nickName)) {
    error =
      "닉네임은 2-20자의 영문, 숫자, 기호만 사용 가능하며, 꼭 한글이나 영문을 포함하고 있어야 합니다.";
  }
  return error;
};

export const validatePassword = (password) => {
  let error = "";
  /*
      비밀번호 형식을 검증하기 위한 정규 표현식
      1. 영문(대소문자 포함), 숫자, 기호만 입력했는지 판별한다.
      2. 영문, 숫자, 기호 중 2가지 이상을 조합했는지 판별한다.
      3. 길이가 8자 이상, 20자 이하인지 판별한다.
    */
  const passwrodRegex = /^(?=.*[a-zA-Z])(?=.*\d|.*\p{P})(?!.*\s).{8,20}$/u;

  if (password.length === 0) {
    error = "비밀번호가 입력되지 않았습니다.";
  } else if (!passwrodRegex.test(password)) {
    error =
      "비밀번호는 8-20자의 영문, 숫자, 기호만 사용 가능하며, 두 종류 이상을 조합해야 합니다.";
  }

  return error;
};
