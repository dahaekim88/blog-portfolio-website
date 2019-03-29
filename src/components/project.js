import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import PostTag from "./tag"

const Container = styled.div`
  display: flex;
  align-items: center;
`

const PostTitle = styled.h2`
  &:hover {
    color: #1ca086;
  }
`

const PostDate = styled.span`
  color: #8e8e8e;
  font-size: 0.8rem;
`

const PostLink = styled(Link)`
  text-decoration: none;
`

const PostExcerpt = styled.p`
  margin: 1rem 0;
`

export default props => (
  <div>
    <Container>
      <div>
        <PostLink to={props.to}>
          <PostTitle>{props.title}</PostTitle>
        </PostLink>
        <PostDate>{props.date}</PostDate> {` `}
        <PostTag tags={props.tags} />
        {props.description ? (
          <PostExcerpt>{props.description}</PostExcerpt>
        ) : (
          <PostExcerpt>{props.excerpt}</PostExcerpt>
        )}
      </div>
    </Container>
  </div>
)
