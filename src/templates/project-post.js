import React from "react"
import { graphql } from "gatsby"

import {
  Layout,
  SEO,
  Tag
} from "../components"
import {
  Container,
  PostTitle,
  StyledHref,
  StyledButton,
  DisabledStyledButton,
  Img,
} from "../components/reusable"

export default ({ data }) => {
  const { title: siteTitle } = data.site.siteMetadata
  const post = data.markdownRemark
  const { title, description, tags, gif, demo, source } = post.frontmatter
  const editedTitle = `${title} - ${siteTitle}`

  return (
    <Layout>
      <SEO title={editedTitle} description={description} />
      <Container>
        <Img src={gif} alt={title} style={{ margin: "2rem 0" }} />

        <div>
          <PostTitle>{title}</PostTitle>
          <Tag tags={tags} />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          {demo === "private" ? (
            <StyledHref
              class="disable"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DisabledStyledButton>Private Demo</DisabledStyledButton>
            </StyledHref>
          ) : (
              <StyledHref href={demo} target="_blank" rel="noopener noreferrer">
                <StyledButton>Demo</StyledButton>
              </StyledHref>
            )}
          {` `}
          {source === "private" ? (
            <StyledHref
              class="disable"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DisabledStyledButton>Private Source</DisabledStyledButton>
            </StyledHref>
          ) : (
              <StyledHref href={source} target="_blank" rel="noopener noreferrer">
                <StyledButton>Source</StyledButton>
              </StyledHref>
            )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        tags
        gif
        demo
        source
      }
    }
  }
`
