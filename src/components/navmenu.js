import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Menu = styled.div`
  display: inline-block;
  padding: 0.5rem 0.5rem 0.5rem ${props => props.padding};
`

export const NavMenu = props => (
  <Menu padding={props.padding}>
    <Link to={props.to}>{props.children}</Link>
  </Menu>
)
