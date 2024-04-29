import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DarkModeContent } from "@/components/DarkModeProvider/index.jsx";
import PropTypes from "prop-types";
import cx from 'classname'
import { useMediaQuery } from "@mui/material";
import classname from "classname";

import './index.scss'

const PageGuideNav = ({ source }) => {
  const [toc, setToc] = useState([]);
  const [tocActiveId, setTocActiveId] = useState('')

  const ctx = useContext(DarkModeContent)
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeDarkMode = ctx.darkMode === 'auto' ? (osDarkMode ? 'dark' : 'light') : ctx.darkMode

  useLayoutEffect(() => {
    const articlePageDom = document.querySelector('.markdown-body')
    const children = articlePageDom.childNodes
    const arr = []
    children.forEach(item => {
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
    })

    window.onscroll = () => {
      const currentY = window.scrollY;
      for (let i = 0; i < arr.length; i++) {
        if (currentY > arr[i].boundingClientRectTop && currentY < arr[i + 1].boundingClientRectTop) {
          setTocActiveId(arr[i].id)
        }
      }
    }

    setToc(arr)
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
