import React from "react"

import { Container } from "./reusable"

export default () => (
  <Container>
    <center>
      © Dahae Kim {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </center>
  </Container>
)
