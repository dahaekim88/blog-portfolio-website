import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "../../components/header"
import Project from "../../components/project"
import { Container, PageHeading } from "../../components/reusable"

export default ({ data }) => {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout>
      <PageHeading>
        <Header
          title="Projects"
          subtitle="앞으로 가득가득 채워나갈 작업 공간"
        />
      </PageHeading>
      <Container>
        {projects.map(({ node }) => (
          <Project
            key={node.id}
            title={node.frontmatter.title}
            image={node.frontmatter.image}
            tags={node.frontmatter.tags}
            to={node.fields.slug}
            titleSize="2rem"
            tagSize="1rem"
          />
        ))}
      </Container>
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
