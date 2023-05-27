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
                url, {
                method: requestOptions.method ? requestOptions.method : 'GET',
                headers: requestOptions.headers ? requestOptions.headers : {},
                body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
                }
            );
            
            if (res.status !== 200) {
                throw new ResponseError('잘못된 응답입니다.', res)
            }

            const data = await res.json();
            applyData(data.result);

        } catch (err) {
            console.log(err)
            const status = err.ResponseError.status;
            const data = err.ResponseError.data;
            switch (status) {
                case 401:
                case 404:
                    alert(`${data.result.message}`)
                    dispatch(logout())
                    window.location.reload()
                    break
                default:
                    alert('서버와 통신할 수 없습니다. 잠시 후 다시 시도해주세요.')
                    navigate('/')
            }
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