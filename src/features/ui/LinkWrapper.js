import PropTypes from 'prop-types'
import { Link as OriginalLink } from 'react-router-dom'
import styled from 'styled-components'

const Link = ({ target, children }) => {
  return (
    <StyledLink to={target}>
      {children}
    </StyledLink>
  )
}

Link.propTypes = {
  target: PropTypes.string,
}

const StyledLink = styled(OriginalLink)`
  font-family: inherit;
  color: inherit;
`

export default Link
