import { useLayoutEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from 'remark-gfm'
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeRewrite from 'rehype-rewrite';
import slug from 'rehype-slug'
import toc from 'rehype-toc'
import dayjs from "dayjs";
import { Skeleton, useTheme } from "@mui/material";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";
import classname from 'classname'
import PropTypes from 'prop-types'

import './index.scss'

const MDRenderer = ({ data }) => {
  const [dataset, setDataset] = useState(null)
  const [time, setTime] = useState(null)

  const theme = useTheme()

  const handleClick = (e) => {
    if (e.target.tagName === 'IMG') {
      const previewContainer = document.getElementById('preview-container');

      // 判断是否处于预览状态，是的话直接返回
      if (previewContainer.style.display === 'flex') {
        return;
      }

      const preview = document.getElementById('preview');
      preview.innerHTML = '';

      const previewImg = document.createElement('img');
      previewImg.src = e.target.src;
      previewImg.style.maxHeight = '100vh';
      previewImg.style.maxWidth = '100vw';

      preview.appendChild(previewImg);
      previewContainer.style.display = 'flex';

      // 在下一帧中添加淡入效果
      requestAnimationFrame(() => {
        previewContainer.style.opacity = '1';
      });
    }
  };

  const closePreview = () => {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.style.opacity = '0';

    // 在淡出动画完成后隐藏预览窗口
    setTimeout(() => {
      previewContainer.style.display = 'none';
    }, 300); // 与淡入动画时间一致
  };

  useLayoutEffect(() => {
    const scrollListener = () => {
      const tocItems = document.querySelectorAll('.toc-link');
      const currentScroll = window.scrollY;
      tocItems.forEach((tocItem, index) => {
        const tocItemTxt = tocItem.getAttribute('href').substring(1);
        const articleTitleDom = document.getElementById(tocItemTxt);
        if (articleTitleDom) {
          const articleTitleDomOffsetTop = articleTitleDom.offsetTop;
          const nextTocItem = tocItems[index + 1];
          let nextArticleTitleDomOffsetTop;
          if (nextTocItem) {
            const nextTocItemTxt = nextTocItem.getAttribute('href').substring(1);
            const nextArticleTitleDom = document.getElementById(nextTocItemTxt);
            if (nextArticleTitleDom) {
              nextArticleTitleDomOffsetTop = nextArticleTitleDom.offsetTop;
            }
          }
          if (
            (index === 0 && currentScroll <= articleTitleDomOffsetTop) || // First element
            (index === tocItems.length - 1 && currentScroll >= articleTitleDomOffsetTop) || // Last element
            (index !== 0 && index !== tocItems.length - 1 &&
              articleTitleDomOffsetTop <= currentScroll &&
              (nextArticleTitleDomOffsetTop === undefined || nextArticleTitleDomOffsetTop > currentScroll)
            )
          ) {
            tocItem.classList.add('toc-link-active');
          } else {
            tocItem.classList.remove('toc-link-active');
          }
        }
      });
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);


  const init = async () => {
    const file = await unified()
      .use(remarkParse) // Convert into markdown AST
      .use(remarkGfm)
      .use(remarkRehype) // Transform to HTML AST
      .use(rehypeSanitize) // Sanitize HTML input
      .use(rehypeHighlight)
      .use(slug)
      .use(toc, {
        headings: ["h2", 'h3', 'h4'],
        cssClasses: {
          toc: "toc-wrap",
          link: "toc-link",
        },
      })
      .use(rehypeRewrite, {
        rewrite: (node, index, parent) => {
          if (node.tagName === 'img') {
            parent.children = [{
              type: 'element', tagName: 'img', properties: {
                ...node.properties, loading: 'lazy'
              }
            }]
          }
        }
      })
      .use(rehypeStringify) // Convert AST into serialized HTML
      .process(data.Content)
    setTime(readingTime(String(file)))
    setDataset(file)
  }

  useLayoutEffect(() => {
    init()
  }, [data]);

  if (!dataset) {
    return <>
      <Skeleton variant="rectangular" height={80} width={200} style={{ margin: '20px auto 70px' }} />
      <Skeleton variant="rectangular" height={20} style={{ margin: '10px' }} />
      <Skeleton variant="rectangular" height={40} style={{ margin: '10px' }} />
      <Skeleton variant="rectangular" height={10} style={{ margin: '10px' }} />
      <Skeleton variant="rectangular" height={10} style={{ margin: '10px' }} />
      <Skeleton variant="rectangular" height={30} style={{ margin: '10px' }} />
    </>
  }

  return <div
    className={classname({
      'md_renderer-wrap': true, 'dark': theme.palette.mode === 'dark'
    })}
    onClick={handleClick}
  >
    <div className='article-info-wrap'>
      <div className='created-date'>发布于: {dayjs(data.CreatedAt || '').format('YYYY-MM-DD HH:mm:ss')}</div>
      <div className='reading-words'>字数: {time.words}</div>
      <div className='reading-time'>阅读时间: {Math.floor(time.minutes)}分钟</div>
    </div>
    <div id="preview-container" onClick={closePreview}>
      <div id="preview"></div>
    </div>
    <article id='article' dangerouslySetInnerHTML={{ __html: String(dataset) }}></article>
  </div>
}

MDRenderer.propTypes = {
  data: PropTypes.object
}

export default MDRenderer
