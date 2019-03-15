import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import profile from "../images/profile-pic.png"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Sns = styled.div`
  display: inline-block;
  margin: 0 0.45rem;
`

const StyledHref = styled.a`
  text-decoration: none;
  color: #b7bcbc;
  &:hover {
    color: #1ca086;
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={data => {
      const { title, social } = data.site.siteMetadata

      return (
        <Container>
          <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
            <img src={profile} alt="dahaekim" style={{ borderRadius: "50%" }} />
          </Link>
          <h2 style={{ marginTop: `1rem` }}>{title}</h2>
          <p>Web Developer</p>
          <div>
            <Sns>
              <StyledHref
                href={`https://github.com/${social.github}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref
                href={`https://linkedin.com/in/${social.linkedin}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref href={`mailto:${social.email}`}>
                <FaEnvelope />
              </StyledHref>
            </Sns>
          </div>
          {/* <div>
            <NavMenu to="/blog">Articles</NavMenu>
            <NavMenu to="/projects">Projects</NavMenu>
          </div> */}
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
