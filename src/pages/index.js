import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"
import Project from "../components/project"
import {
  StyledButton,
  StyledHr,
  Row,
  Col,
  PageTitle,
} from "../components/reusable"

export default ({ data }) => {
  const results = data.allMarkdownRemark.edges

  const posts = results.filter(
    result => result.node.frontmatter.category === "blog"
  )
  const post = posts[0].node

  const projects = results
    .filter(result => result.node.frontmatter.category === "projects")
    .filter((project, index) => index === 0 || index === 1)
  console.log(projects)

  return (
    <Layout>
      <section id="one">
        <PageTitle>Recent Post</PageTitle>
        <Post
          key={post.id}
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          description={post.frontmatter.description}
          excerpt={post.excerpt}
          to={post.fields.slug}
          tags={post.frontmatter.tags}
        />
        <Link to={post.fields.slug}>
          <StyledButton>Read More</StyledButton>
        </Link>
      </section>

      <StyledHr />

      <section id="two">
        <PageTitle>Recent Projects</PageTitle>
        <Row>
          {projects.map(({ node }) => (
            <Col>
              <Project
                key={node.id}
                image={node.frontmatter.image}
                title={node.frontmatter.title}
                to={node.fields.slug}
              />
            </Col>
          ))}
        </Row>
        <Link to="/projects">
          <StyledButton>Full Portfolio</StyledButton>
        </Link>
      </section>

      <StyledHr />

      <section id="three">
        <PageTitle>Get In Touch</PageTitle>
        <form method="post" action="mailto:dhkim1014@gmail.com">
          <Row>
            <Col>
              <input type="text" name="name" id="name" placeholder="Name" />
            </Col>
            <Col>
              <input type="email" name="email" id="email" placeholder="Email" />
            </Col>
          </Row>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            rows="4"
          />
          <StyledButton type="submit">Send Message</StyledButton>
        </form>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            description
            tags
            image
            category
          }
          fields {
            slug
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
