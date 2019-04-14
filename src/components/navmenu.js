import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  display: inline-block;
  padding: 0.5rem;

  .active {
    text-decoration: overline;
  }
`

const NavLink = styled(Link)`
  color: #787878;
  font-size: 1.2rem;
  font-family: "Work Sans", sans-serif;

  &:hover,
  &:active {
    color: #ecc7c0;
    text-decoration: overline;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export default ({ to, padding, children }) => {
  const [linkStyle, setLinkStyle] = useState("")

  const handleClick = () => {
    setLinkStyle("active")
  }

  return (
    <Container padding={padding}>
      <NavLink to={to} className={linkStyle} onClick={handleClick}>
        {children}
      </NavLink>
    </Container>
  )
}
