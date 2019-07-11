const { slugify } = require('./src/util/utilifyFunctions')
const path = require('path')
//const authors = require('./src/util/authors')
const _ = require('lodash')

// exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions
//     if (node.internal.type === "ContentfulPost") {
//         const slugFromTitle = slugify(node.title)
//         createNodeField({
//             node,
//             name: 'slug',
//             value: slugFromTitle
//         })
//     }
// }
exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const templates = {
        singlePost: path.resolve("src/templates/single-post.js"),
        tagsPage: path.resolve("src/templates/tags-page.js"),
        tagPosts: path.resolve("src/templates/tag-posts.js"),
        postList: path.resolve("src/templates/post-list.js"),
        authorPosts: path.resolve("src/templates/author-posts.js")
    }

    return graphql(`
    {
        allContentfulPost{
            edges{
                node{
                    author
                    tags
                    slug
                }
            }
        }
        allContentfulPerson{
            edges{
                node{
                    name
                }
            }
        }
    }
    `).then(
        res => {
            if (res.errors) return Promise.reject(res.errors)
            const posts = res.data.allContentfulPost.edges
            //Create single blog post pages
            posts.forEach(({ node }) => {
                createPage({
                    path: node.slug,
                    component: templates.singlePost,
                    context: {
                        slug: node.slug
                    }
                })
            })
            // Get all tags
            let tags = []
            _.each(posts, edge => {
                if (_.get(edge, 'node.tags')) {
                    tags = tags.concat(edge.node.tags)
                }
            })
            // ['design', 'code', ...]
            // {design: 5, code: 6, ...}
            let tagPostCounts = {}
            tags.forEach(tag => {
                tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
            })
            tags = _.uniq(tags)

            // Create tags page
            createPage({
                path: `/tags`,
                component: templates.tagsPage,
                context: {
                    tags,
                    tagPostCounts
                }
            })
            //Create tag posts pages
            tags.forEach(tag => {
                createPage({
                    path: `/tag/${slugify(tag)}`,
                    component: templates.tagPosts,
                    context: {
                        tag
                    }
                })
            })

            const postsPerPage = 2
            const numberOfPages = Math.ceil(posts.length / postsPerPage)

            Array.from({ length: numberOfPages }).forEach((_, index) => {
                const isFirstPage = index === 0
                const currentPage = index + 1

                if (isFirstPage) return

                createPage({
                    path: `/page/${currentPage}`,
                    component: templates.postList,
                    context: {
                        limit: postsPerPage,
                        skip: index * postsPerPage,
                        currentPage,
                        numberOfPages
                    }
                })
            })
            const authors = res.data.allContentfulPerson.edges
            authors.forEach(({ node })  => {
                createPage({
                    path: `/author/${slugify(node.name)}`,
                    component: templates.authorPosts,
                    context: {
                        authorName: node.name
                    }
                })
            })
        }
    )
}