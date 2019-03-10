import React from "react"
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
