import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResponseError } from "../utils/error";
import { logout } from "../utils/reducers/loginState";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = useCallback(async (url, requestOptions, onComplete) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: requestOptions.method ? requestOptions.method : "GET",
        headers: requestOptions.headers ? requestOptions.headers : {},
        body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
      });

      if (!res.ok) {
        throw new ResponseError(res);
      }

      const resData = await res.json();
      onComplete(resData.result);
    } catch (err) {
      /*
          TODO: 404 not found (객체 리소스 없음, URL 없음) 에 대해서
          Backend 개발자와 대화 필요

          현재는 객체 리소스가 없는 경우, 해당 Uri 요청이 없는 경우 모두
          404 not found를 반환하고 있음
      */

      const errData = await err.res.json();
      switch (err.res.status) {
        /*
          [중대한 위험]: 401 unAuthentication
          사용자 인증 정보나, 보호된 자원에 잘못 접근한 경우
          사용자의 인증 정보를 Clear 한 다음,
          메인 페이지로 redirect 해야 함 
        */
        case 401:
          alert(errData.result.message);
          dispatch(logout());
          navigate("/");
          break;
        /*
          [경미한 위험]: 404 not Found, 409 Conflict
          중복된 자원을 생성하거나, 없는 자원을 참조하는 경우
          페이지를 refresh 해야 함
         */
        case 404:
        case 409:
          alert(errData.result.message);
          window.location.reload();
          break;
        /*
          [기타 위험]
         */
        default:
          alert("서버와의 통신에 문제가 발생했습니다.");
          window.location.reload();
      }
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
