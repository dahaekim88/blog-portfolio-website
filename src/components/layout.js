import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "./seo"
import SideBar from "./sidebar"

const Layout = styled.div``

const Main = styled.div`
  margin-left: 35%;
  padding: 3em;
  width: 65%;

  @media screen and (max-width: 980px) {
    margin-left: 0;
    padding: 1em 3em 2em 3em;
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
          <SEO title={title} description={description} />
          <SideBar />
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
