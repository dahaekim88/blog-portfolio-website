import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 1rem 0;
`

const Header = styled.h3`
  margin: 0;
  font-size: 32px;
  color: #1ca086;
  text-align: center;
  font-weight: 700;
  position: relative;
  padding-bottom: 15px;

  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 120px;
    height: 1px;
    background: #ddd;
    bottom: 1px;
    left: calc(50% - 60px);
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 40px;
    height: 3px;
    background: #ecc7c0;
    bottom: 0;
    left: calc(50% - 20px);
  }

  @media screen and (max-width: 600px) {
    font-size: 26px;
  }
`

const SubHeading = styled.p`
  text-align: center;
  padding-top: 20px;
  color: #787878;
`

export default ({ title, subtitle }) => (
  <Container>
    <Header>{title}</Header>
    {subtitle ? <SubHeading>{subtitle}</SubHeading> : ""}
  </Container>
)
