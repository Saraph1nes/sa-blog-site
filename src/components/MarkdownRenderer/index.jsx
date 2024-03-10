import remarkGfm from 'remark-gfm'
import rehypeHighlight from "rehype-highlight";
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown';
import MarkdownNavbar from "markdown-navbar";
import rehypeSlug from "rehype-slug";
import rehypeGallery from "rehype-lightgallery";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import classname from "classname";
import {useTheme} from "@mui/material";
import {useContext} from "react";
import {DarkModeContent} from "@/components/DarkModeProvider/index.jsx";

import './index.scss'

const MarkdownRenderer = ({data}) => {
  const ctx = useContext(DarkModeContent);
  const theme = useTheme()

  return <article
    className={classname({
      'markdown-body-wrap': true,
      'dark': theme.palette.mode === 'dark',
      'light': theme.palette.mode !== 'dark'
    })}
  >
    <ReactMarkdown
      className='markdown-body'
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeGallery,
        rehypeHighlight,
        [rehypeSlug, {}],
        [rehypeAutolinkHeadings, {behavior: 'wrap'}]
      ]}
    >
      {data.Content}
    </ReactMarkdown>

    {
      !ctx.isMobile && <div className='page-guide-nav-content-wrap'>
        <MarkdownNavbar
          className='page-guide-nav-content'
          headingTopOffset={20}
          source={data.Content}
          ordered={false}
          updateHashAuto={false}
          declarative={false}
        />
      </div>
    }
  </article>
}

MarkdownRenderer.propTypes = {
  data: PropTypes.object
}

export default MarkdownRenderer
