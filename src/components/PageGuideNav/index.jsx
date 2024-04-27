import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DarkModeContent } from "@/components/DarkModeProvider/index.jsx";
import PropTypes from "prop-types";
import cx from 'classname'
import { useMediaQuery } from "@mui/material";

import './index.scss'
import classname from "classname";

const PageGuideNav = ({ source }) => {
  const [toc, setToc] = useState([]);
  const [tocActiveId, setTocActiveId] = useState('')

  const ctx = useContext(DarkModeContent)
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeDarkMode = ctx.darkMode === 'auto' ? (osDarkMode ? 'dark' : 'light') : ctx.darkMode

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setTocActiveId(e[0].target.id)
      }
    });
    const articlePageDom = document.querySelector('.markdown-body')
    const children = articlePageDom.childNodes
    const arr = []
    children.forEach(item => {
      if (['h2', 'h3', 'h4'].includes(item.localName)) {
        const id = item.id;
        const name = item.firstChild.innerText;
        const type = +item.tagName.slice(1);

        observer.observe(item)

        arr.push({
          type,
          id,
          name,
          element: item
        })
      }
    })
    setToc(arr)
    return () => {
      observer.disconnect()
    }
  }, [])

  const handleTocItemClick = (item) => {
    const offsetTop = item.element.offsetTop
    console.log(offsetTop);
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  return <div className={cx({
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
