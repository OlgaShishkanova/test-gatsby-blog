const dotenv = require('dotenv')

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
module.exports = {
  siteMetadata: {
    title: `Code Blog`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `atpza04kuqbf`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken:  process.env.CONTENTFUL_ACCESS_TOKEN,

        //accessToken:  `fjQpkcFEMZFS38TWjzm6Hc2JBCMot58kTh34hWVnGpo`,
      },
    },
  ],
}
