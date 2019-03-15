import React from "react"
import { Helmet } from "react-helmet"
import { Link, StaticQuery, graphql } from "gatsby"

import layoutStyles from "./layout.module.css"

const NavMenu = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className={layoutStyles.container}>
        <Helmet>
          <html lang="ko" />
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <meta property="og:url" content="/" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          {/* <meta property="og:image" content="/img/og-image.jpg" /> */}
        </Helmet>
        <header>
          <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
            <h3 style={{ display: `inline` }}>
              {data.site.siteMetadata.title}
            </h3>
          </Link>
          <ul style={{ listStyle: `none`, float: `right` }}>
            <NavMenu to="/blog">Blog</NavMenu>
            <NavMenu to="/projects">Projects</NavMenu>
          </ul>
        </header>
        {children}
      </div>
    )}
  />
)
