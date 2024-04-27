import { useLayoutEffect, useState } from "react";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";
import readingTime from "reading-time";
import classname from 'classname'
import PropTypes from 'prop-types'
import MarkdownRenderer from "@/components/MarkdownRenderer/index.jsx";

import './index.scss'

const ArticleRenderer = ({ data }) => {
  const [time, setTime] = useState(null)

  const theme = useTheme()

  const init = async () => {
    setTime(readingTime(String(data.Content || '')))
  }

  useLayoutEffect(() => {
    init()
  }, [data]);

  return <div
    className={classname({
      'article_renderer-wrap': true, 'dark': theme.palette.mode === 'dark'
    })}
  >
    <div>
      {
        time && <div className='article-info-wrap'>
          <div className='created-date'>发布于: {dayjs(data.CreatedAt || '').format('YYYY-MM-DD HH:mm:ss')}</div>
          <div className='reading-words'>字数: {time.words}</div>
          <div className='reading-time'>阅读时间: {Math.floor(time.minutes)}分钟</div>
        </div>
      }
      <MarkdownRenderer data={data}></MarkdownRenderer>
    </div>
  </div>
}

ArticleRenderer.propTypes = {
  data: PropTypes.object
}

export default ArticleRenderer
