import { useContext, useEffect, useLayoutEffect, useState, useRef, useMemo } from "react";
import { DarkModeContent } from "@/components/DarkModeProvider/index.jsx";
import PropTypes from "prop-types";
import cx from 'classname'
import { useMediaQuery } from "@mui/material";
import throttle from 'lodash/throttle'
import classname from "classname";

import './index.scss'

const PageGuideNav = ({ source }) => {
  const [toc, setToc] = useState([]);
  const [tocActiveId, setTocActiveId] = useState('')

  const tocActiveIndex = useMemo(() => toc.findIndex(item => item.id === tocActiveId), [toc, tocActiveId])

  const tocRef = useRef(null)

  const ctx = useContext(DarkModeContent)
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeDarkMode = ctx.darkMode === 'auto' ? (osDarkMode ? 'dark' : 'light') : ctx.darkMode

  // 初始化标题数组
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 })
    if (!source) return
    const articlePageDom = document.querySelector('.markdown-body')
    const children = articlePageDom.childNodes
    const arr = []

    for (const item of children) {
      if (['h2', 'h3', 'h4'].includes(item.localName)) {
        const id = item.id;
        const name = item.firstChild.innerText;
        const type = +item.tagName.slice(1);

        arr.push({
          type,
          id,
          name,
          element: item,
          boundingClientRectTop: item.getBoundingClientRect().top
        })
      }
    }

    setTocActiveId(arr[0]?.id || '')
    setToc(arr)
  }, [source])

  // 处理滚动事件，根据滚动位置，设置当前高亮的标题
  useEffect(() => {
    window.onscroll = throttle(() => {
      const currentY = window.scrollY;
      if (currentY > toc[toc.length - 1].boundingClientRectTop) {
        setTocActiveId(toc[toc.length - 1].id)
      } else {
        for (let i = 0; i < toc.length - 1; i++) {
          const currentHeaderArea = currentY > toc[i].boundingClientRectTop;
          const nextHeaderArea = currentY < toc[i + 1].boundingClientRectTop;
          if (currentHeaderArea && nextHeaderArea) {
            setTocActiveId(toc[i].id)
          }
        }
      }
    }, 80)
  }, [toc])

  // 根据页面的滚动位置，设置标题列表的滚动位置
  useEffect(() => {
    const ins = tocRef.current
    if (tocActiveIndex >= 10) {
      ins.scrollTo({
        top: (tocActiveIndex - 10) * 36,
        behavior: 'smooth'
      })
    } else {
      ins.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

  }, [tocActiveIndex, toc])

  const handleTocItemClick = (item) => {
    const offsetTop = item.element.offsetTop
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  return <div
    ref={tocRef}
    className={cx({
      'page-guide-nav-content-wrap': true,
      'dark': themeDarkMode === 'dark'
    })}>
    <div className="page-guide-nav-content" >
      {
        toc.map(item => {
          return <div
            key={item.id}
            style={{ paddingLeft: `${(item.type - 1) * 15}px` }}
            className={classname({
              "nav-content-item": true,
              'active': tocActiveId === item.id
            })}
            onClick={() => handleTocItemClick(item)}
          >
            {item.name}
          </div>
        })
      }
    </div>
  </div>
}

PageGuideNav.propTypes = {
  source: PropTypes.object
}

export default PageGuideNav
