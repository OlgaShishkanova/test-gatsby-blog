import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { Card, CardBody, CardSubtitle, Badge } from 'reactstrap'
import Img from 'gatsby-image'
import { slugify } from '../util/utilifyFunctions'
import { transformText } from '../util/documentToReactComponents'

const SinglePost = ({ data, pageContext }) => {
    const post = data.contentfulPost

    const baseUrl = 'https://gatsbytutorial.co.uk/'
   
    return (
        <Layout pageTitle={post.title} postAuthor={post.personReference} authorImageFluid={post.personReference.imageUrl.sizes}>
            <SEO title={post.title} />
            <Card>
                <Img className="card-image-top" fluid={post.image.sizes} />
                <CardBody>
                    <CardSubtitle>
                        <span className="post-info">{post.date}</span> by{' '}
                        <span className="post-info">{post.author}</span>
                    </CardSubtitle>
                    {transformText(post.postText.json)}
                    <ul className="post-tags">
                        {post.tags.map(tag => (
                            <li key={tag}>
                                <Link to={`/tag/${slugify(tag)}`}>
                                    <Badge color="primary">{tag}</Badge>

                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
            <h3 className="text-center">
                Share this post
            </h3>
            <div className="text-center social-share-links">
                <ul>
                    <li><a href={'https://www.facebook.com/sharer.php?u=' + baseUrl + pageContext.slug} target="_blank" rel="noopener noreferrer" className="facebook">
                        FB share
                        </a>
                    </li>
                    <li><a href={'https://twitter.com/share?url-' + baseUrl + pageContext.slug + '&text=' + post.title + '&via twitterHandle'} target="_blank" rel="noopener noreferrer" className="twitter">
                        TW share
                        </a>
                    </li>
                </ul>
            </div>
        </Layout>
    )
}
export const postQuery = graphql`
    query blogPostBySlug($slug: String!){
        contentfulPost(slug: {eq: $slug}){
            id
                title
                author
                date(formatString: "MMM Do YYYY")
                tags
                personReference{
                    imageUrl{
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
                image {
                    sizes(maxWidth: 700) {
                      ...GatsbyContentfulSizes
                    }
                  }
                  postText{
                    json
                  }
        }
    }
`
export default SinglePost