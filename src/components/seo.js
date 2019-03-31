import React from "react"
import { Helmet } from "react-helmet"

export default ({ title, description }) => (
  <Helmet>
    <html lang="ko" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:url" content="/" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    {/* <meta property="og:image" content="/img/og-image.jpg" /> */}
  </Helmet>
)
