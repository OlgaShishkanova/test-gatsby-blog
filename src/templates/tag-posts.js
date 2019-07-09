import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/Post'

const tagPosts = ({ data, pageContext }) => {
    const { tag } = pageContext
    const { totalCount } = data.allContentfulPost
    const pageHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagges with "${tag}"`

    return (
        <Layout pageTitle={pageHeader}>
            {data.allContentfulPost.edges.map(({ node }) => (
                <Post key={node.id}
                    slug={node.slug}
                    title={node.title}
                    author={node.author}
                    date={node.date}
                    body={node.shortText}
                    tags={node.tags}
                    fluid={node.image.sizes}

                />
            ))}

        </Layout>
    )
}
export const tagQuery = graphql`
    query($tag: String!){
        allContentfulPost(
            sort: {fields: [date], order: DESC}
            filter: {tags: {in: [$tag]}}
        ){
            totalCount
            edges{
                node{
                    id
                    title
                    date(formatString: "MMM Do YYYY")
                    author
                    tags
                    slug
                    shortText
                      image {
                        sizes(maxWidth: 650, maxHeight: 371) {
                              ...GatsbyContentfulSizes
                            }
                          }
                    }
            }
        }
    }
`
export default tagPosts