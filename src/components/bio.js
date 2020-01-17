import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

import { Center, StyledHref, Sns } from "../components/reusable"
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoMdMail,
  IoMdCopy,
} from "react-icons/io"
import profile from "../images/profile.png"

const Paragraph = styled.p`
  text-align: center;
  padding: 20px;
  color: #333;
`

export default () => (
  <StaticQuery
    query={query}
    render={data => {
      const { social } = data.site.siteMetadata

      return (
        <Center direction="column">
          <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
            <img src={profile} alt="dada" style={{ borderRadius: "50%" }} />
          </Link>
          <Paragraph>
            Former Fashion Buyer,
            <br />
            Now Software Engineer
          </Paragraph>
          <div>
            <Sns>
              <StyledHref
                href={`https://github.com/${social.github}`}
                rel="noopener noreferrer"
                target="_blank"
                color="#ecc7c0"
                data-tip
                data-for="github"
              >
                <ReactTooltip id="github" place="bottom" effect="solid">
                  <span>Github</span>
                </ReactTooltip>
                <IoLogoGithub />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref
                href={`https://linkedin.com/in/${social.linkedin}`}
                rel="noopener noreferrer"
                target="_blank"
                color="#ecc7c0"
                data-tip
                data-for="linkedin"
              >
                <ReactTooltip id="linkedin" place="bottom" effect="solid">
                  <span>LinkedIn</span>
                </ReactTooltip>
                <IoLogoLinkedin />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref
                href={`mailto:${social.email}`}
                color="#ecc7c0"
                data-tip
                data-for="gmail"
              >
                <ReactTooltip id="gmail" place="bottom" effect="solid">
                  <span>Gmail</span>
                </ReactTooltip>
                <IoMdMail />
              </StyledHref>
            </Sns>
            <Sns>
              <StyledHref
                href={`https://docs.google.com/document/d/1IfJhLs5G67eJf0nh8JePffLAungSJXtZHdZmcM88B-4/edit?usp=sharing`}
                rel="noopener noreferrer"
                target="_blank"
                color="#ecc7c0"
                data-tip
                data-for="resume"
              >
                <ReactTooltip id="resume" place="bottom" effect="solid">
                  <span>Résumé</span>
                </ReactTooltip>
                <IoMdCopy />
              </StyledHref>
            </Sns>
          </div>
        </Center>
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
