import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const MenuLink = styled(Link)`
  color: #f1c3d3;
`
const Menu = styled.div`
  display: inline-block;
  padding: 0.5rem 0.5rem 0.5rem ${props => props.padding};
`

export const NavMenu = props => (
  <Menu padding={props.padding}>
    <MenuLink to={props.to}>{props.children}</MenuLink>
  </Menu>
)
