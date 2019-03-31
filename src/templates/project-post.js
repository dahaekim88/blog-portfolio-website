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
  const { title, description, tags, image, demo, source } = post.frontmatter
  const editedTitle = `${title} - ${siteTitle}`

  return (
    <Layout>
      <SEO title={editedTitle} description={description} />
      <div>
        <PostTitle>{title}</PostTitle>
        {` `}
        <PostTag tags={tags} />

        <Img src={image} alt={title} style={{ margin: "2rem 0" }} />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <StyledHref href={demo} target="_blank" rel="noopener noreferrer">
          <StyledButton>Demo</StyledButton>
        </StyledHref>
        {` `}
        {source === "private" ? (
          <StyledButton>Private Source</StyledButton>
        ) : (
          <StyledHref href={source} target="_blank" rel="noopener noreferrer">
            <StyledButton>Source</StyledButton>
          </StyledHref>
        )}
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
        image
        gif
        demo
        source
      }
    }
  }
`
