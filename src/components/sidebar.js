import React from "react"
import styled from "styled-components"

import Bio from "./bio"
import { NavMenu } from "./navmenu"

const SideBar = styled.div`
  background-color: #3c2e3d; // 735b69
  position: fixed;
  top: 0;
  left: 0;
  min-width: 35%;
  min-height: 100%;
  z-index: 1;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 980px) {
    left: auto;
    padding: 6em 4em;
    position: relative;
    text-align: center;
    top: auto;
    min-width: 100%;
    min-height: 100vh;
  }
`

const MenuContainer = styled.div`
  padding: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
`

const Footer = styled.div`
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  margin: 1rem auto;
  color: #fff;
`
const Mouse = styled.div`
  @media screen and (max-width: 980px) {
    position: absolute;
    width: 22px;
    height: 42px;
    bottom: 40px;
    left: 50%;
    margin-left: -12px;
    border-radius: 15px;
    border: 2px solid #f1c3d3;
    -webkit-animation: intro 1s;
    animation: intro 1s;

    @-webkit-keyframes intro {
      0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        transform: translateY(40px);
      }
      100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }

    @keyframes intro {
      0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        transform: translateY(40px);
      }
      100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
  }
`

const Scroll = styled.div`
  @media screen and (max-width: 980px) {
    display: block;
    width: 3px;
    height: 3px;
    margin: 6px auto;
    border-radius: 4px;
    background: #f1c3d3;
    -webkit-animation: finger 2s infinite;
    animation: finger 2s infinite;

    @-webkit-keyframes finger {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        -webkit-transform: translateY(20px);
        transform: translateY(20px);
      }
    }

    @keyframes finger {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        -webkit-transform: translateY(20px);
        transform: translateY(20px);
      }
    }
  }
`

export default () => (
  <SideBar>
    <Bio />
    <MenuContainer>
      <NavMenu to="/" padding="0.5rem">
        Home
      </NavMenu>
      <NavMenu to="/blog" padding="0.5rem">
        Blog
      </NavMenu>
      <NavMenu to="/projects" padding="0.5rem">
        Projects
      </NavMenu>
    </MenuContainer>
    <Footer>
      © dada {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org" style={{ color: "#f1c3d3" }}>
        Gatsby
      </a>
    </Footer>
    <Mouse>
      <Scroll />
    </Mouse>
  </SideBar>
)
