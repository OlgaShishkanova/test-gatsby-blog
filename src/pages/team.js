import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Card, CardText, CardBody, CardTitle, Button, Row } from 'reactstrap'
import Img from 'gatsby-image'
import { slugify } from '../util/utilifyFunctions'

const TeamPage = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Team" />

    <StaticQuery query={personsQuery} render={data => {
      return (
        <div>{data.allContentfulPerson.edges.map(({ node }) => (
          <Row className="mb-4" key={node.id}>
            <div className="col-md-3">
              <Img style={{ maxWidth: '100%' }} fluid={node.imageUrl.sizes} />
            </div>
            <div className="col-md-8">
              <Card style={{ minHeight: '100%' }}>
                <CardBody>
                  <CardTitle>{node.name}</CardTitle>
                  <CardText> <div dangerouslySetInnerHTML={{ __html: node.bio.childMarkdownRemark.html }} /></CardText>
                  <Button className="text-uppercase" color="primary" href={`/author/${slugify(node.name)}`}>View posts</Button>
                </CardBody>
              </Card>
            </div>
          </Row>
        ))}
        </div>
      )
    }} />
  </Layout>
)

export const personsQuery = graphql`
    query{
      allContentfulPerson{
        edges {
          node {
            name
            imageUrl {
              sizes(maxWidth: 700) {
                ...GatsbyContentfulSizes
              }
            }
            id
            bio {
              childMarkdownRemark{
                  html
                }
            }
          }
        }
        }
    }
`

export default TeamPage