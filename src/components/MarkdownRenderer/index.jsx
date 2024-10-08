import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import classname from 'classname'
import { useTheme } from '@mui/material'

import './index.scss'

const MarkdownRenderer = ({ data }) => {
  const theme = useTheme()

  return (
    <article
      className={classname({
        'markdown-body-wrap': true,
        dark: theme.palette.mode === 'dark',
        light: theme.palette.mode !== 'dark',
      })}
    >
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHighlight,
          [rehypeSlug, {}],
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
      >
        {data.Content}
      </ReactMarkdown>
    </article>
  )
}

MarkdownRenderer.propTypes = {
  data: PropTypes.object,
}

export default MarkdownRenderer
