import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTag from "../components/tag"
import {
  PostTitle,
  PostDate,
  Navigation,
  StyledButton,
} from "../components/reusable"

export default ({ data, pageContext }) => {
  const { title: siteTitle } = data.site.siteMetadata
  const post = data.markdownRemark
  const { title, date, description, tags } = post.frontmatter
  const { previous, next } = pageContext
  const editedTitle = `${title} - ${siteTitle}`

  return (
    <Layout>
      <SEO title={editedTitle} description={description} />
      <div>
        <PostTitle>{title}</PostTitle>
        <PostDate>{date}</PostDate>
        {` `}
        <PostTag tags={tags} />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Navigation>
          <div>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <StyledButton>
                  &laquo; previous
                  {/* ← previous post: {previous.frontmatter.title}  */}
                </StyledButton>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <StyledButton>
                  next &raquo;{/* next post: {next.frontmatter.title} → */}
                </StyledButton>
              </Link>
            )}
          </div>
        </Navigation>
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
        date(formatString: "DD MMMM, YYYY")
        description
        tags
      }
    }
  }
`
