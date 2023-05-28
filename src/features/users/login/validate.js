export const validate = ({ userID, password}) => {
    const errors = {};

    if (userID.length === 0) {
      errors.userID = "아이디가 입력되지 않았습니다.";
    } else if (userID.length >= 255) {
      errors.userID = "아이디가 너무 깁니다.";
    }
  

    if (password.length === 0)  {
      errors.password = '비밀번호가 입력되지 않았습니다.';
    } else if (password.length >= 255) {
      errors.password= "비밀번호가 너무 깁니다.";
    }
  
    return errors;
  }
  