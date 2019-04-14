import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { FaAngleUp } from "react-icons/fa"

import Navbar from "./navbar"
import SEO from "./seo"

const Main = styled.div`
  margin: 0 auto;
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
  width: 40px;
  height: 40px;
  text-align: center;
  background: #8bcbc8;
  opacity: 0.5
  
  &:hover {
    opacity: 1;
  }

  .icon {
    color: #fff;
    font-size: 12px;
  }

  div {
    color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -10px;
  }
`

export default ({ children }) => {
  const [display, setDisplay] = useState("none")
  // console.log("display: ", display)

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
            <Navbar />
            <Main>{children}</Main>
            <BackToTop onClick={scrollToTop} style={{ display }}>
              <FaAngleUp className="icon" />
              <div>TOP</div>
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
