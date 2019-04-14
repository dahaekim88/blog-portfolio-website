import React from "react"

import {
  Figure,
  Img,
  Overlay,
  ProjectTitle,
  TagsContainer,
  Tag,
  LinkContainer,
  LinkButton,
} from "./reusable"

export default ({ image, title, tags, to, titleSize, tagSize }) => (
  <Figure>
    <Img src={image} alt={title} />
    <Overlay />
    <ProjectTitle titleSize={titleSize}>{title}</ProjectTitle>
    <TagsContainer>
      {tags.map(tag => (
        <Tag tagSize={tagSize}>{tag}</Tag>
      ))}
    </TagsContainer>
    <LinkContainer>
      <LinkButton to={to}>View</LinkButton>
    </LinkContainer>
  </Figure>
)
