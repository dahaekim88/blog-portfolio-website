import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

import Bio from "./bio"
import { NavMenu } from "./navmenu"

const Layout = styled.div``

const SideBar = styled.div`
  height: 100vh;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 300 0;
  @media screen and (max-width: 720px) {
    display: none;
  }
`

const Footer = styled.div`
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  margin: 1rem auto;
`

const Container = styled.div`
  padding: 2rem;
  position: relative;
  max-width: 45rem;

  @media screen and (min-width: 720px) {
    margin-left: 300px;
  }
`

const Main = styled.div``

export default ({ children }) => (
  <StaticQuery
    query={query}
    render={data => {
      const { title, description } = data.site.siteMetadata
      return (
        <Layout>
          <Helmet>
            <html lang="ko" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:url" content="/" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            {/* <meta property="og:image" content="/img/og-image.jpg" /> */}
          </Helmet>
          <SideBar>
            <Bio />
            <Footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Footer>
          </SideBar>
          <Container>
            <NavMenu to="/" padding="0">
              Home
            </NavMenu>
            <NavMenu to="/blog" padding="0.5rem">
              Blog
            </NavMenu>
            <NavMenu to="/projects" padding="0.5rem">
              Projects
            </NavMenu>
            <Main>{children}</Main>
          </Container>
        </Layout>
      )
    }}
  />
)

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
