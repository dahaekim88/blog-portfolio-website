import React from "react"
import styled from "styled-components"

import Bio from "../components/bio"
import { NavMenu } from "../components/navmenu"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const NavBar = styled.div`
  margin: 0 auto;
`

export default () => (
  <Container>
    <Bio />
    <NavBar>
      <NavMenu to="/blog" padding="0.5rem">
        Blog
      </NavMenu>
      <NavMenu to="/projects" padding="0.5rem">
        Projects
      </NavMenu>
    </NavBar>
  </Container>
)
