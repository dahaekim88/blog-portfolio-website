import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 3em 0;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`

export const Center = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  justify-content: center;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Col = styled.div`
  flex: 50%;

  &:first-child {
    padding-right: 0.5rem;
  }

  &:last-child {
    padding-left: 0.5rem;
  }

  @media screen and (max-width: 980px) {
    flex: 100%;
    &:first-child {
      padding-right: 0;
    }

    &:last-child {
      padding-left: 0;
    }
  }
`

export const StyledHref = styled.a`
  text-decoration: none;
  color: ${({ color }) => color};
  font-size: 2rem;
  &:hover {
    color: #8bcbc8;
  }
`

export const StyledButton = styled.button`
  background-color: #fff;
  border-radius: 0.35em;
  border: 3px solid #dae9e4; // efefef
  color: #787878;
  cursor: pointer;
  display: inline-block;
  font-size: 12pt;
  font-weight: 400;
  height: calc(2.5em + 6px);
  line-height: 2.5em;
  min-width: 10em;
  margin: 1em 0;
  padding: 0 1.5em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  &:active,
  &:hover {
    color: #49bf9d;
    border: 3px solid #49bf9d;
    background-color: #fff;
  }
`

export const DisabledStyledButton = styled.button`
  background-color: #fff;
  border-radius: 0.35em;
  border: 3px solid #dae9e4; // efefef
  color: #787878;
  pointer-events: none;
  display: inline-block;
  font-size: 12pt;
  font-weight: 400;
  height: calc(2.5em + 6px);
  line-height: 2.5em;
  min-width: 10em;
  margin: 1em 0;
  padding: 0 1.5em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
`

export const PageHeading = styled.div`
  background-color: #f7f7f7;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PostTitle = styled.h1``

export const HoveredPostTitle = styled.h2`
  &:hover {
    color: #1ca086;
  }
`

export const PostDate = styled.span`
  color: #8e8e8e;
  font-size: 0.8rem;
`

export const PostLink = styled(Link)`
  text-decoration: none;
`

export const PostExcerpt = styled.p`
  margin: 1rem 0;
`

export const Navigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem 0;
`

export const Figure = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.25em;
  margin: 2.175rem 1rem;

  @media screen and (min-width: 981px) and (max-width: 1200px) {
    margin: 1.5rem 0;
  }

  @media screen and (max-width: 600px) {
    margin: 1.5rem 0;
  }
`

export const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  transition: background 0.5s ease;

  ${Figure}:hover & {
    display: block;
    background: rgba(0, 0, 0, 0.7);
  }
`

export const ProjectTitle = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 30%;
  font-weight: 600;
  font-size: 2.2rem;
  text-align: center;
  text-transform: uppercase;
  color: white;
  opacity: 0;
  transition: opacity 0.35s ease;

  ${Figure}:hover & {
    opacity: 1;
  }

  @media screen and (min-width: 981px) and (max-width: 1600px) {
    font-size: ${({ titleSize }) => titleSize};
  }

  @media screen and (min-width: 781px) and (max-width: 980px) {
    font-size: 1.8rem;
  }

  @media screen and (min-width: 481px) and (max-width: 780px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`

export const TagsContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 40%;
  opacity: 0;
  margin-top: 0.8rem;
  transition: opacity 0.35s ease;
  display: flex;
  justify-content: center;

  ${Figure}:hover & {
    opacity: 1;
  }
`

export const Tag = styled.span`
  background-color: #8bcbc8;
  color: #fff;
  font-size: ${({ tagSize }) => tagSize};
  font-weight: 300;
  margin: 0 0.3rem;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;

  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0 0.3rem;
    border-radius: 0.6rem;
    line-height: 1rem;
  }
`

export const LinkContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 65%;
  opacity: 0;
  transition: opacity 0.35s ease;
  display: flex;
  justify-content: center;

  ${Figure}:hover & {
    opacity: 1;
  }
`

export const LinkButton = styled(Link)`
  width: 20%;
  text-align: center;
  color: #b7bcbc;
  border: 3px solid #b7bcbc;
  border-radius: 0.35em;
  padding: 0.5rem 0;

  &:hover {
    color: #f1c3d3;
    border-color: #f1c3d3;
  }

  @media screen and (min-width: 601px) and (max-width: 1200px) {
    font-size: 1rem;
    padding: 0.2rem 0;
  }

  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0;
    width: 30%;
  }
`

export const Sns = styled.div`
  display: inline-block;
  margin: 0.45rem;
`
