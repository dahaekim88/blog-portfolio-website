import React from "react"

import {
  Figure,
  Img,
  Overlay,
  ProjectTitle,
  LinkContainer,
  LinkButton,
} from "./reusable"

export default ({ image, title, to }) => (
  <Figure>
    <Img src={image} alt={title} />
    <Overlay />
    <ProjectTitle>{title}</ProjectTitle>
    <LinkContainer>
      <LinkButton to={to}>View</LinkButton>
    </LinkContainer>
  </Figure>
)
