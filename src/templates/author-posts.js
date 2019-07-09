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
                    slug={node.fields.slug}
                    title={node.title}
                    author={node.author}
                    date={node.date}
                    body={node.postText.postText}
                    tags={node.tags}
                    fluid={node.image.childImageSharp.fluid}

                />
            ))}
        </Layout>
    )
}

// export const authorQuery = graphql`
//     query($authorName: String!, $imageUrl: String!){
//         allContentfulPost(
//             sort: {fields: [date], order: DESC}
//             filter: {author: {eq: $authorName}}
//         ){
//             totalCount
//             edges{
//                 node{
//                     id
//                         title
//                         date(formatString: "MMM Do YYYY")
//                         author
//                         tags
//                         image{
//                             fluid{
//                               src
//                             }
//                           }
//                           postText{
//                             postText
//                           }
//                     fields{
//                         slug
//                     }
//                 }
//             }
//         }
//         file(relativePath: {eq: $imageUrl}){
//             childImageSharp{
//                 fluid(maxWidth: 300){
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//         }
//     }
// `
export default authorPosts