import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/Post';
import PaginationLinks from '../components/PaginationLinks';

const postList = (props) => {
    const posts = props.data.allContentfulPost.edges
    const { currentPage, numberOfPages } = props.pageContext
    return (
        <Layout pageTitle={`Page: ${currentPage}`}>
            {posts.map(({ node }) => (
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
            <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages} />
        </Layout>
    )
}
export const postListQuery = graphql`
    query postListQuery($skip: Int!, $limit: Int!){
        allContentfulPost(
            sort: {fields: [date], order: DESC}
            limit: $limit
            skip: $skip
        ){
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
export default postList