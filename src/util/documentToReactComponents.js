import React from 'react'
import { Link } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

//rich-text-react-renderer API
//https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer

const Bold = ({ children }) => <span className="bold">{children}</span>
const UlList = ({ children }) => <ul className="post-ul">{children}</ul>
const Quote = ({ children }) => <blockquote className="post-blockquote">{children}</blockquote>
const H1 = ({ children }) => <h1 className="post-h1">{children}</h1>
const H2 = ({ children }) => <h2 className="post-h2">{children}</h2>

const CustomComponent = ({ title, description, author, slug }) => (
    <Link className="embedded-block" to={`/${slug}`}>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <div>{author}</div>
        </div>
    </Link>
);

const options = {
    renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
        [BLOCKS.UL_LIST]: (node, children) => <UlList>{children}</UlList>,
        [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
        [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
        [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
        // !! if embedded block is added to Rich Text it's necessary to delete .cache folder and run develop again
        // or else node.data.target.fields will be undefined
        // The same thing when ANYTHING is changed in the Rich Text where embedded block is.
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            const { title, shortText, author, slug } = node.data.target.fields;
            console.log(node.data.target.fields)
            return <CustomComponent title={title["en-US"]} description={shortText["en-US"]} author={author["en-US"]} slug={slug["en-US"]}/>
        }
    },
}
export const transformText = (text) => {
    return documentToReactComponents(text, options)
}
export const transformPlainText = (text) => {
    return documentToReactComponents(text)
}