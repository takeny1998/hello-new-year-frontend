import { useState } from "react";
import { useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback( async (url, requestOptions, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(
                url,
                requestOptions.method ? requestOptions.method : 'GET',
                requestOptions.headers ? requestOptions.headers : {},
                requestOptions.body ? JSON.stringify(requestOptions.body) : {},
            );
            
            if (res.status !== 200) {
                throw new ResponseError('잘못된 응답입니다.', res)
            }

            const data = res.data.result;
            applyData(data);

        } catch (err) {
            const status = err.ResponseError.status
            switch (status) {
                case 401:
                case 404:
                    alert(`${res.data.result.message}`)
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