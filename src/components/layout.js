import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

import Bio from "./bio"
import { NavMenu } from "./navmenu"
import wallpaper from "../images/wallpaper.jpg"

const Layout = styled.div``

const SideBar = styled.div`
  background-image: url(${wallpaper});
  background-repeat: repeat, no-repeat;
  background-size: auto, auto 100%;
  background-attachment: scroll, fixed;
  height: 100%;
  width: 35%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 300 0;

  @media screen and (max-width: 980px) {
    background-attachment: scroll;
    background-position: 0 0, 50%;
    background-size: auto, cover;
    left: auto;
    padding: 8em 4em;
    position: relative;
    text-align: center;
    top: auto;
    width: 100%;
    display: block;
  }
`

const Footer = styled.div`
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  margin: 1rem auto;
  position: relative;
  top: 5rem;
`

const MenuContainer = styled.div`
  padding: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
`

const Main = styled.div`
  margin-left: 35%;
  padding: 3em 3em;
  width: 65%;

  @media screen and (max-width: 980px) {
    margin-left: 0;
    padding: 3em 3em;
    width: 100%;
  }
`

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
            <MenuContainer>
              <NavMenu to="/blog" padding="0.5rem">
                Blog
              </NavMenu>
              <NavMenu to="/projects" padding="0.5rem">
                Projects
              </NavMenu>
            </MenuContainer>
            <Footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Footer>
          </SideBar>
          <Main>{children}</Main>
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
