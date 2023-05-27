import styled from 'styled-components'
import Button from 'features/ui'

function Modal({ onConfirm, children }) {
  return (
    <ModalLayout>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalLayout>
  )
}

const ModalLayout = styled.div`
  width: 400px;

  z-index: 999;

  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);

  background: white;
  border-radius: 12px;
  border: 1px solid var(--pink-100);
  padding: 40px 20px;

  gap: 24px;

  @media (max-width: 400px) {
    width: 90%;
  }
`


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: nanumRound;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  span {
    word-break: keep-all;
    line-height: 28px;
    margin-bottom: 24px;
  }

  .title {
    font-size: 24px;
  }

  .focus {
    font-weight: 900;
    color: var(--pink);
  }
`

export default Modal
