import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Post from "../../components/post"
import { PageTitle } from "../../components/reusable"

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <PageTitle>Blog</PageTitle>
      {posts.map(({ node }) => (
        <div>
          <Post
            key={node.id}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            description={node.frontmatter.description}
            excerpt={node.excerpt}
            to={node.fields.slug}
            tags={node.frontmatter.tags}
          />
          <div>{node.fields.tagSlugs}</div>
        </div>
      ))}
      {/* pagination */}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            tags
          }
          fields {
            slug
          }
          excerpt(pruneLength: 180)
        }
      }
    }
  }
`
