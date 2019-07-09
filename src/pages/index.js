import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import Post from "../components/Post";
import PaginationLinks from "../components/PaginationLinks";

const IndexPage = () => {
  const postsPerPage = 2;
  let numberOfPages
  return (
    <Layout pageTitle="CodeBlog">
      <SEO title="Home" />
      <StaticQuery query={indexQuery} render={data => {
        numberOfPages = Math.ceil(data.allContentfulPost.totalCount / postsPerPage)
        return (
          <div>{data.allContentfulPost.edges.map(({ node }) => (
            <Post title={node.title}
              key={node.id}
              author={node.author}
              slug={node.slug}
              date={node.date}
              body={node.postText.json}
              fluid={node.image.sizes}
              tags={node.tags}
            />
          ))}
            <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
          </div>
        )
      }} />

    </Layout>
  )
}
const indexQuery = graphql`
query{
  allContentfulPost(sort: {fields: [date], order: DESC}
    limit: 2){
    totalCount
    edges{
      node{
        id
          title
          date(formatString: "MMM Do YYYY")
          author
          tags
          image {
            sizes(maxWidth: 600) {
              ...GatsbyContentfulSizes
            }
          }
          postText{
            json
          }
          slug
      }
    }
  }
}
`

export default IndexPage
