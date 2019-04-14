import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import NavMenu from "./navmenu"

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 10px auto;
`

const Logo = styled(Link)`
  display: inline-block;
  padding: 0.5rem;
  color: #787878;
  font-size: 1.2rem;
  font-family: "Work Sans", sans-serif;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const MenuContainer = styled.div``

export default () => (
  <NavBar>
    <Logo to="/">DAHAE KIM</Logo>
    <MenuContainer>
      <NavMenu to="/">Home</NavMenu>
      <NavMenu to="/blog">Blog</NavMenu>
      <NavMenu to="/projects">Projects</NavMenu>
    </MenuContainer>
  </NavBar>
)
