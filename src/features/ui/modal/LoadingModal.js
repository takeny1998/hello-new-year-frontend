import { HashLoader } from "react-spinners"
import styled from "styled-components";
import ReactDOM  from "react-dom";
import BackDrop from "./BackDrop";

const LoadingSpinner = () => {
    return (
        <LoadingSpinnerLayout>
            <HashLoader color="#fff" />
        </LoadingSpinnerLayout>
    );
}

const LoadingSpinnerLayout = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`

const LoadingModal = () => {
    return (
        <>
        {ReactDOM.createPortal(
            <BackDrop />,
            document.getElementById('backdrop-root')
        )}

        {ReactDOM.createPortal(
            <LoadingSpinner />,
            document.getElementById('backdrop-root')
        )}
        </>
    );
}


export default LoadingModal;