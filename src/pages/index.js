import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import {
  Loader,
  Layout,
  Header,
  Bio,
  Post,
  Project,
} from "../components"
import {
  Container,
  Center,
  StyledButton,
  Row,
  Col,
} from "../components/reusable"

export default ({ data }) => {
  const results = data.allMarkdownRemark.edges

  const posts = results.filter(
    result =>
      result.node.frontmatter.category === "blog" &&
      result.node.frontmatter.open === true
  )
  // console.log("posts: ", posts)
  const post = posts[0].node

  const projects = results
    .filter(result => result.node.frontmatter.category === "projects")
    .filter((project, index) => index === 0 || index === 1)
  // console.log("projects: ", projects)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  })

  return (
    <>
      {isLoading
        ?
        <Loader />
        :
        <Layout>
          <section id="bio">
            <Container>
              <Header title="About Me" />
              <Bio />
            </Container>
          </section>

          <section id="post">
            <Container>
              <Header title="Recent Post" />
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
            </Container>
          </section>

          <section id="projects">
            <Container>
              <Header title="Recent Projects" />
              <Row>
                {projects.map(({ node }) => (
                  <Col key={node.id}>
                    <Project
                      key={node.id}
                      image={node.frontmatter.image}
                      title={node.frontmatter.title}
                      tags={node.frontmatter.tags}
                      to={node.fields.slug}
                      titleSize="1.5rem"
                      tagSize="0.8rem"
                    />
                  </Col>
                ))}
              </Row>
              <Center>
                <Link to="/projects">
                  <StyledButton>Full Portfolio</StyledButton>
                </Link>
              </Center>
            </Container>
          </section>

          <section id="contact">
            <Container>
              <Header title="Get In Touch" />
              <form method="post" action="mailto:dhkim1014@gmail.com">
                <Row>
                  <Col>
                    <input type="text" name="name" id="name" placeholder="Name" />
                  </Col>
                  <Col>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
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
                <Center>
                  <StyledButton type="submit">Send Message</StyledButton>
                </Center>
              </form>
            </Container>
          </section>
        </Layout>
      }
    </>
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
            open
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
