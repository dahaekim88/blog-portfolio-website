import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTag from "../components/tag"
import {
  PostTitle,
  StyledHref,
  StyledButton,
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
      <div>
        <Img src={gif} alt={title} style={{ margin: "2rem 0" }} />

        <div>
          <PostTitle>{title}</PostTitle>
          <PostTag tags={tags} />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <StyledHref href={demo} target="_blank" rel="noopener noreferrer">
            <StyledButton>Demo</StyledButton>
          </StyledHref>
          {` `}
          {source === "private" ? (
            <StyledHref
              class="disable"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledButton>Private Source</StyledButton>
            </StyledHref>
          ) : (
            <StyledHref href={source} target="_blank" rel="noopener noreferrer">
              <StyledButton>Source</StyledButton>
            </StyledHref>
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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
