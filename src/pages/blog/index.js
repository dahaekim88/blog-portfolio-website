import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "../../components/header"

import styles from "./blog.module.css"
import jsThumbnail from "../../images/javascript.png"

const Post = props => (
  <div className={styles.post}>
    <div className={styles.main}>
      <img src={props.thumbnail} className={styles.thumbnail} alt="" />
      <div className={styles.description}>
        <h2 className={styles.title}>{props.title}</h2>
        <p>{props.date}</p>
        {/* tags */}
      </div>
    </div>
    <p className={styles.excerpt}>{props.excerpt}</p>
  </div>
)

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Header headerText="Blog" />
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Post
          key={node.id}
          thumbnail={jsThumbnail}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          excerpt={node.excerpt}
        />
      ))}
      {/* pagination */}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
