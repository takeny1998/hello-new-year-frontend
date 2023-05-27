import styled from 'styled-components'
import PropTypes from 'prop-types';


const BackDrop = ({ onClick }) => {
    return (<BackDropLayout onClick={onClick} />);
}

BackDrop.propTypes = {
    onClick: PropTypes.func,
}

const BackDropLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.75);
`

export default BackDrop;