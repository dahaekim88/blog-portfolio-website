import React from "react"
import styled from "styled-components"

import { HoveredPostTitle, PostDate, PostLink, PostExcerpt } from "./reusable"
import PostTag from "./tag"

const Container = styled.div`
  display: flex;
  align-items: center;
`

export default ({ to, title, date, tags, description, excerpt }) => (
  <Container>
    <div>
      <PostLink to={to}>
        <HoveredPostTitle>{title}</HoveredPostTitle>
      </PostLink>
      <PostDate>{date}</PostDate> {` `}
      <PostTag tags={tags} />
      {description ? (
        <PostExcerpt>{description}</PostExcerpt>
      ) : (
        <PostExcerpt>{excerpt}</PostExcerpt>
      )}
    </div>
  </Container>
)
