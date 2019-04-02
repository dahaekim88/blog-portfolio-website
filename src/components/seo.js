import React from "react"
import { Helmet } from "react-helmet"

import icon from "../images/icon.png"

export default ({ title, description }) => (
  <Helmet>
    <html lang="ko" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="apple-touch-icon" sizes="180x180" href={icon} />
    <meta property="og:url" content="/" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={icon} />
  </Helmet>
)
