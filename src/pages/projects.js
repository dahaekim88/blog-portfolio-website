import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ width: "60%", color: "purple" }}>
    <Header headerText="Projects" />
    <Link to="/">Home</Link>
    <Link to="/blog">Blog</Link>
  </div>
)
