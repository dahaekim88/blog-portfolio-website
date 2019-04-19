import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "../../components/header"
import Post from "../../components/post"
import { Container, PageHeading } from "../../components/reusable"

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <PageHeading>
        <Header title="Blog" subtitle="끄적끄적, 혼자만의 기술 노트" />
      </PageHeading>
      <Container>
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
          </div>
        ))}
        {/* pagination */}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "blog" }, open: { eq: true } } }
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
