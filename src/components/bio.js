import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { Container, StyledHref } from "../components/reusable"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import profile from "../images/icon.png"

const Sns = styled.div`
  display: inline-block;
  margin: 0.45rem;
`

export default () => (
  <StaticQuery
    query={query}
    render={data => {
      const { social } = data.site.siteMetadata

      return (
        <Container>
          <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
            <img src={profile} alt="dada" style={{ borderRadius: "50%" }} />
          </Link>
          {/* <h2 style={{ marginTop: `1rem` }}>{title}</h2>
          <p>Web Developer</p> */}
          <div>
            <Sns>
              <StyledHref
                href={`https://github.com/${social.github}`}
                rel="noopener noreferrer"
                target="_blank"
                color="#fff"
              >
                <FaGithub />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref
                href={`https://linkedin.com/in/${social.linkedin}`}
                rel="noopener noreferrer"
                target="_blank"
                color="#fff"
              >
                <FaLinkedin />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref href={`mailto:${social.email}`} color="#fff">
                <FaEnvelope />
              </StyledHref>
            </Sns>
          </div>
        </Container>
      )
    }}
  />
)

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
          linkedin
          email
        }
      }
    }
  }
`
