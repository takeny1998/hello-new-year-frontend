import useHttp from "hooks/use-http";
import { useCallback, useReducer } from "react";
import { RABBIT_INIT_STATE, WISH_INIT_STATE } from "utils/constant";

const reducer = (state, actions) => {
  switch (actions.type) {
    case "SET_ALL":
      return actions.value;
    case "SET_BACKGROUND":
      return {
        ...state,
        backgroundIndex: actions.value,
      };
    case "SET_WISH_INFO":
      return {
        ...state,
        wishInfo: {
          ...state.wishInfo,
          [actions.key]: actions.value,
        },
      };
    case "SET_RABBIT_INFO":
      return {
        ...state,
        rabbitInfo: {
          ...state.rabbitInfo,
          [actions.key]: actions.value,
        },
      };
    default:
      return state;
  }
};

const useUserData = () => {
  const { isLoading, sendRequest: fetch } = useHttp();

  const [userData, dispatch] = useReducer(reducer, {
    nickName: "",
    money: 0,
    backgroundIndex: 0,
    wishInfo: WISH_INIT_STATE,
    rabbitInfo: RABBIT_INIT_STATE,
  });

  const fetchUserData = useCallback((uuid) => {
    const applyUserData = ({ nickName, money, wish, custom }) => {
      const [wishFont, wishColor, rabbitColor, rabbitAcc, backgroundIndex] =
        custom.split(";");

      const wishInfo = {
        value: wish,
        font: wishFont,
        color: wishColor,
      };

      const rabbitInfo = {
        color: rabbitColor,
        acc: rabbitAcc,
      };
      dispatch({
        type: "SET_ALL",
        value: { nickName, backgroundIndex, money, wishInfo, rabbitInfo },
      });
    };

    fetch(`/api/rabbit/${uuid}`, {}, applyUserData);
  }, []);

  return {
    userData,
    isFetching: isLoading,
    fetchUserData,
    dispatchUserData: dispatch,
  };
};

export default useUserData;
