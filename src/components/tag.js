import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const TagLink = styled(Link)`
  font-size: 0.8rem;
  color: #ffbf00;
  text-decoration: none;
`

export default ({ tags }) => (
  <>
    {tags.map((tag, index) => {
      let separator = ", "
      if (index + 1 === tags.length) {
        separator = ""
      }
      return (
        <span key={tag}>
          <TagLink to={`tags/${tag}`}>{tag}</TagLink>
          {separator}
        </span>
      )
    })}
  </>
)
