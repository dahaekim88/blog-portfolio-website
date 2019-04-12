import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const MenuLink = styled(Link)`
  color: #f1c3d3;

  &:hover,
  &:active {
    text-decoration: overline;
  }

  .active {
    text-decoration: overline;
  }
`
const Menu = styled.div`
  display: inline-block;
  padding: 0.5rem 0.5rem 0.5rem ${props => props.padding};
`

export default ({ to, padding, children }) => {
  const [linkStyle, setLinkStyle] = useState("")
  // let clicked = null

  const handleClick = () => {
    setLinkStyle("active")
    // console.log("clicked: ", clicked)
    // if (clicked.classList) {
    //   clicked.classList.add("active")
    // } else {
    //   clicked.class += " active"
    // }
  }

  return (
    <Menu padding={padding}>
      {/* <span
        ref={element => {
          clicked = element
        }}
        onClick={handleClick}
      > */}
      <MenuLink to={to} className={linkStyle} onClick={handleClick}>
        {children}
      </MenuLink>
      {/* </span> */}
    </Menu>
  )
}
