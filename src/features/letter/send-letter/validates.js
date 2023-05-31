const validate = (content, money, author) => {
  let error = {};
  if (content.length === 0) {
    error.content = "내용이 입력되지 않았습니다.";
  } else if (content.length >= 255) {
    error.content = "편지는 255자까지 쓸 수 있습니다.";
  }
  if (money === undefined) {
    error.money = "용돈을 선택해 주세요.";
  } else if (![1000, 5000, 10000, 50000].includes(money)) {
    error.money = "잘못된 용돈 값입니다.";
  }

  if (author.length === 0) {
    error.author = "보내시는 분의 이름을 적어주세요.";
  } else if (author.length >= 255) {
    error.author = "보내시는 분의 이름은 255까지 입력 가능합니다.";
  }
  return error;
};
export default validate;
