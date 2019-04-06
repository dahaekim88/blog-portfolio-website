import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import MdArrowUp from "react-ionicons/lib/MdArrowUp"

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

const BackToTop = styled.a`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  font-size: 10px;
  text-align: center;
  background: #8bcbc8;
  opacity: 0.3

  &:hover {
    opacity: 1;
  }
`

export default ({ children }) => {
  const [display, setDisplay] = useState("none")
  console.log("display: ", display)

  const showButton = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setDisplay("block")
    } else {
      setDisplay("none")
    }
  }

  const scrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    window.onscroll = () => {
      showButton()
    }
  })

  return (
    <StaticQuery
      query={query}
      render={data => {
        const { title, description } = data.site.siteMetadata
        return (
          <div>
            <SEO title={title} description={description} />
            <SideBar />
            <Main>{children}</Main>
            <BackToTop onClick={scrollToTop} style={{ display }}>
              <MdArrowUp style={{ color: "#fff" }} />
            </BackToTop>
          </div>
        )
      }}
    />
  )
}

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
