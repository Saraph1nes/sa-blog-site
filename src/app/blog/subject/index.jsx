import { useNavigate } from 'react-router-dom'

import './index.scss'

const Subject = () => {
  const navigate = useNavigate()

  const onPaperClick = (type) => {
    if (type === 'frontend') {
      navigate('/blog/book/1')
    }
    if (type === 'backend') {
      navigate('/blog/book/2')
    }
    if (type === 'algorithm') {
      navigate('/blog/book/14')
    }
    if (type === 'designPatterns') {
      navigate('/blog/book/17')
    }
  }

  return (
    <div className="page-subject">
      <div className="page-subject-left">
        <div className="page-subject-divider"></div>
        <h2 className="page-subject-en-title">Technical</h2>
        <h2 className="page-subject-cn-title">技术专题</h2>
        {/* <div className="page-subject-cn-desc">我的技术小册</div> */}
      </div>
      <div className="page-subject-right">
        <section className="page-subject-technical-section">
          <div className="page-subject-technical-section-left">
            <div
              className={`special-subject-list-item frontend`}
              onClick={() => onPaperClick('frontend')}
            >
              <div className="special-subject-list-item-content-words-wrap">
                <h3 className="special-subject-list-item-title">前端专题</h3>
                <div className="special-subject-list-item-desc">
                  <ul>
                    <li>浏览器</li>
                    <li>javascript</li>
                    <li>JS-API</li>
                    <li>前端框架</li>
                    <li>...</li>
                  </ul>
                </div>
              </div>
              <img
                className="special-subject-list-item-bg"
                src="http://assest.sablogs.cn/img/typora/bright-2178848_1280.jpg"
                alt=""
              ></img>
            </div>
            <div
              className={`special-subject-list-item backend`}
              onClick={() => onPaperClick('backend')}
            >
              <div className="special-subject-list-item-content-words-wrap">
                <h3 className="special-subject-list-item-title">后端专题</h3>
                <div className="special-subject-list-item-desc">
                  <ul>
                    <li>GO</li>
                    <li>nestjs</li>
                    <li>服务器</li>
                    <li>...</li>
                  </ul>
                </div>
              </div>
              <img
                className="special-subject-list-item-bg"
                src="http://assest.sablogs.cn/img/typora/blooming-2178785_1280.jpg"
              ></img>
            </div>
          </div>

          <div className="page-subject-technical-section-right">
            <div
              className={`special-subject-list-item algorithm`}
              onClick={() => onPaperClick('algorithm')}
            >
              <div className="special-subject-list-item-content-words-wrap">
                <h3 className="special-subject-list-item-title">算法专题</h3>
                <div className="special-subject-list-item-desc">
                  <ul>
                    <li>双指针</li>
                    <li>DP</li>
                    <li>二分法</li>
                    <li>滑动窗口</li>
                    <li>...</li>
                  </ul>
                </div>
              </div>
              <img
                className="special-subject-list-item-bg"
                src="http://assest.sablogs.cn/img/typora/art-2178683_1280.jpg"
              ></img>
            </div>
            <div
              className={`special-subject-list-item designPatterns`}
              onClick={() => onPaperClick('designPatterns')}
            >
              <div className="special-subject-list-item-content-words-wrap">
                <h3 className="special-subject-list-item-title">
                  设计模式专题
                </h3>
                <div className="special-subject-list-item-desc">
                  <ul>
                    <li>行为型模式</li>
                    <li>创建型模式</li>
                    <li>工厂模式</li>
                    <li>单例模式</li>
                    <li>...</li>
                  </ul>
                </div>
              </div>
              <img
                className="special-subject-list-item-bg"
                src="http://assest.sablogs.cn/img/typora/champagne-2178775_1280.jpg"
              ></img>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Subject
