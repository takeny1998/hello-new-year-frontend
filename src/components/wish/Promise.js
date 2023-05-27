import styled from 'styled-components'
import PropTypes from 'prop-types'

import PromiseBg from 'assets/images/promise.png'
import { FONT_COLOR_OPTION, FONT_OPTION } from 'utils/constant'

function Promise({ info, editable = false }) {
    const {value, font, color} = info;
    return (
    <Container
        font={FONT_OPTION[font]}
        color={FONT_COLOR_OPTION[color]}
    >
        <div
        id="letter-content"
        onKeyDown={event => {
            if (event.key === 'Enter') {
            document.execCommand('insertLineBreak')
            event.preventDefault()
            }
        }}
        onInput={event => {
        }}
        contentEditable={editable ? true : false}
        >
        {value}
        </div>
        <img src={PromiseBg} alt="" />
    </Container>
    )
}

Promise.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.func,
  fontOption: PropTypes.number,
  colorOption: PropTypes.number,
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  > div {
    position: absolute;
    width: 100%;
    height: 100%;

    background: none;
    border: none;
    color: ${({ color }) => color};
    text-align: center;

    font-family: ${({ font }) => font};
    font-weight: bold;
    font-size: 18px;

    padding: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  input:focus {
    outline: 2px solid var(--pink-200);
  }

  @media (min-width: 500px) {
    font-size: 21px;
  }
`

export default Promise
