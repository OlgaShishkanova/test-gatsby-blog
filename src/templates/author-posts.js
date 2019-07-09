import React from 'react'
import authors from '../util/authors'
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/Post';

const authorPosts = ({ data, pageContext }) => {
    const { totalCount } = data.allContentfulPost
    const author = authors.find(x => x.name === pageContext.authorName)
    const posts = totalCount === 1 ? "post" : "posts"
    const pageHeader = `${totalCount} ${posts} by: ${pageContext.authorName}`

    return (
        <Layout pageTitle={pageHeader} postAuthor={author}
            authorImageFluid={data.file.childImageSharp.fluid}>
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

export const authorQuery = graphql`
    query($authorName: String!, $imageUrl: String!){
        allContentfulPost(
            sort: {fields: [date], order: DESC}
            filter: {author: {eq: $authorName}}
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
        file(relativePath: {eq: $imageUrl}){
            childImageSharp{
                fluid(maxWidth: 300){
                  ...GatsbyImageSharpFluid
                }
              }
        }
    }
`
export default authorPosts