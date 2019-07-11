import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/Post';

const authorPosts = ({ data, pageContext }) => {
    const { totalCount } = data.allContentfulPost
    const author = data.contentfulPerson
    const posts = totalCount === 1 ? "post" : "posts"
    const pageHeader = `${totalCount} ${posts} by: ${pageContext.authorName}`

    return (
        <Layout pageTitle={pageHeader} postAuthor={author}
            authorImageFluid={author.imageUrl.sizes}>
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
    query($authorName: String!){
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
        contentfulPerson(name: {eq: $authorName}){
                imageUrl {
                  sizes(maxWidth: 700) {
                    ...GatsbyContentfulSizes
                  }
                }
                bio {
                    childMarkdownRemark{
                        html
                      }
                  }
                  facebook
                  twitter
                  instagram
                  linkedin
                  name
        }

    }
`
export default authorPosts