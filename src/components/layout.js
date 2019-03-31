import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "./seo"
import SideBar from "./sidebar"

const Main = styled.div`
  margin-left: 35%;
  padding: 3em;
  width: 65%;

  @media screen and (max-width: 980px) {
    margin-left: 0;
    padding: 1em 1em 2em 1em;
    width: 100%;
  }
`

export default ({ children }) => (
  <StaticQuery
    query={query}
    render={data => {
      const { title, description } = data.site.siteMetadata
      return (
        <div>
          <SEO title={title} description={description} />
          <SideBar />
          <Main>{children}</Main>
        </div>
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
