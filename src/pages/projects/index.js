import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Post from "../../components/post"
import Title from "../../components/title"

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <Layout>
        <Title>Projects</Title>
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
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "projects" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            tags
            image
            demo
            source
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
