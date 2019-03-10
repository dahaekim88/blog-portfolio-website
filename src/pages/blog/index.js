import React from "react"

import Layout from "../../components/layout"
import Header from "../../components/header"

import styles from "./blog.module.css"

const Post = props => (
  <div className={styles.post}>
    <div className={styles.main}>
      <img src={props.thumbnail} className={styles.thumbnail} alt="" />
      <div className={styles.description}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.excerpt}>{props.excerpt}</p>
      </div>
    </div>
  </div>
)

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Header headerText="Blog" />
      <Post
        title="Jane Doe"
        thumbnail="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
        excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
      <Post
        title="Bob Smith"
        thumbnail="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
        excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
    </Layout>
  )
}
