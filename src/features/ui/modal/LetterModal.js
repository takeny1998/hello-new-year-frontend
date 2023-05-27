import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";
import Modal from "./Modal";
import {Button, ButtonWrapper } from "features/ui";

import RabbitImg from 'assets/images/main.png'
import { useNavigate } from "react-router-dom";


const LetterModal = ({ onComfirm }) => {
    const navigate = useNavigate();

    return (
        <>
        {ReactDOM.createPortal(
            <BackDrop />,
            document.getElementById('backdrop-root')
        )}

        {ReactDOM.createPortal(
            <Modal onConfirm={onComfirm}>

                <span>
                    <img src={RabbitImg} alt={RabbitImg} style={{width: "40%"}} />
                </span>
                <span className="title focus">편지함을 확인하세요!</span>

                <span>2023년 새해가 밝았어요. 이제 흑토끼가 가져온 묘한 편지함을 열어볼까요?</span>
                
                <ButtonWrapper>
                <Button onClick={() => navigate('/letter-box')}>
                    편지함 확인
                </Button>
                <Button background="--pink-100" onClick={onComfirm}>
                    닫기
                </Button>
                </ButtonWrapper>
            </Modal>,
            document.getElementById('backdrop-root')
        )}
        </>
    );
}

export default LetterModal;