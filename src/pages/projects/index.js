import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Project from "../../components/project"
import { PageTitle } from "../../components/reusable"

export default ({ data }) => {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout>
      <PageTitle>Projects</PageTitle>
      {projects.map(({ node }) => (
        <Project
          key={node.id}
          title={node.frontmatter.title}
          image={node.frontmatter.image}
          to={node.fields.slug}
        />
      ))}
    </Layout>
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
