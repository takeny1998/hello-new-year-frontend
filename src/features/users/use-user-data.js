const { default: useHttp } = require("hooks/use-http");
const { useState, useEffect, useCallback } = require("react");
const { useSelector } = require("react-redux");
const { WISH_INIT_STATE, RABBIT_INIT_STATE } = require("utils/constant");

const useUserData = () => {
    const { isLoading, sendRequest: fetch} = useHttp();

    const [ userData, setUserData ] = useState({
        money: 0,
        wish: WISH_INIT_STATE,
        rabbit: RABBIT_INIT_STATE,
    });

    const fetchUserData = useCallback((uuid) => {
      const applyUserData = (data) => {
        const [
          wishFont,
          wishColor,
          rabbitColor,
          rabbitAcc,
        ] = data.custom.split(';');
  
        const wishInfo = {
          value: data.wish,
          font: wishFont,
          color: wishColor,
        }
  
        const rabbitInfo = {
          color: rabbitColor,
          acc: rabbitAcc,
        }
        setUserData({
            nickName: data.nickName, money: data.money,
            wish: wishInfo, rabbit: rabbitInfo
        });
      }
  
      fetch(`/api/rabbit/${uuid}`, 
        {},
        applyUserData
      );
    }, []);

    return {
        userData,
        isLoading,
        fetchUserData,
    };
}

export default useUserData;