import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResponseError } from "../utils/error";
import { logout } from "../utils/reducers/loginState";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendRequest = useCallback( async (url, requestOptions, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(
                url, 
                {
                    method: requestOptions.method ? requestOptions.method : 'GET',
                    headers: requestOptions.headers ? requestOptions.headers : {},
                    body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
                }
            );
            if (!res.ok) {
                throw new ResponseError(res);
            }
            
            const resData = await res.json();

            if (requestOptions.method === 'POST') {
                alert(resData.result.message);
                window.location.reload();
            } else {
                applyData(resData.result);
            }

        } catch (err) {
            /*
                TODO: 404 not found (객체 리소스 없음, URL 없음) 에 대해서
                Backend 개발자와 대화 필요

                현재는 객체 리소스가 없는 경우, 해당 Uri 요청이 없는 경우 모두
                404 not found를 반환하고 있음
            */
            switch(err.status) {
                case 401: case 404: case 409:
                    const errBody = await err.json();
                    alert(errBody.message);
                    break;
                default:
                    alert("서버와의 통신에 문제가 발생했습니다.");
                    
            }
            dispatch(logout());
            navigate('/');
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
}

export default useHttp;