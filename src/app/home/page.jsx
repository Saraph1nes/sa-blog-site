import service from "@/utils/http";
import {useLayoutEffect, useState, useContext} from "react";
import {Chip, Divider, Paper, useTheme} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import dayjs from "dayjs";
import classname from 'classname'
import CountUp from "react-countup";
import Heatmap from "@/components/Heatmap";
import {DarkModeContent} from "@/components/DarkModeProvider";
import {TAG_COLOR_ARR} from "@/app/home/constant.js";
import SubjectPanel from "@/app/home/SubjectPanel.jsx";
import ArticleList from "@/app/home/ArticleList.jsx";

import './page.scss'

function Home() {
  const ctx = useContext(DarkModeContent);
  const navigate = useNavigate();
  const theme = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [heatmapDataset, setHeatmapDataset] = useState({
    Calendar: [],
    TotalCount: 0
  })
  const [tagListDataset, setTagListDataset] = useState([])

  const fetchGetArticleHeatmap = async () => {
    return await service.get('/article/getArticleHeatmap')
  }

  const fetchGetAllTags = async () => {
    return await service.get('/tag/GetAllTags')
  }

  const init = async () => {
    const [fetchGetArticleHeatmapRes, fetchGetAllTagsRes] = await Promise.all([
      await fetchGetArticleHeatmap(),
      await fetchGetAllTags()
    ])
    setTagListDataset(fetchGetAllTagsRes.Data)
    setHeatmapDataset(fetchGetArticleHeatmapRes.Data)
    setIsMounted(true)
  }

  useLayoutEffect(() => {
    init()
  }, []);


  if (!isMounted) {
    return <main className='main'></main>
  }

  return (<main
    className={classname({
      'main': true,
      'dark': theme.palette.mode === 'dark',
      'mobile': ctx.isMobile,
    })}
  >
    {/*<Banner />*/}

    {/*<Welcome/>*/}

    <section className='container-wrap'>
      <div className='container'>

        {/*专题*/}
        <SubjectPanel/>

        <ArticleList/>
      </div>

      {
        !ctx.isMobile && <aside className='aside-wrap'>
          <Paper className='statistical-panel' elevation={1}>
            <div className='heatmap-nums'>
              <div className="heatmap-nums-item">
                <div className='heatmap-nums-count'><CountUp end={dayjs().diff('2018-03-07', 'day')}/></div>
                <div className='heatmap-nums-title'>天</div>
              </div>
              {/*<Divider orientation="vertical" flexItem/>*/}
              {/*<div className="heatmap-nums-item">*/}
              {/*  <div className='heatmap-nums-count'><CountUp end={400}/></div>*/}
              {/*  <div className='heatmap-nums-title'>PV</div>*/}
              {/*</div>*/}
              <Divider orientation="vertical" flexItem/>
              <div className="heatmap-nums-item">
                <div className='heatmap-nums-count'><CountUp end={heatmapDataset.TotalCount}/></div>
                <div className='heatmap-nums-title'>文章</div>
              </div>
            </div>
            <Divider className='statistical-panel-standard-divider'/>
            <Heatmap heatmapDataset={heatmapDataset.Calendar}/>
          </Paper>

          <Paper className='tag-panel' elevation={1}>
            <div className='tag-panel-title'>标签</div>
            <Divider sx={{marginTop: '10px'}}/>
            {
              tagListDataset.map((tag, tagIdx) => <Chip
                key={tag.ID}
                style={{
                  border: `1px solid ${TAG_COLOR_ARR[tagIdx % 10]}80`,
                  background: `${TAG_COLOR_ARR[tagIdx % 10]}33`
                }}
                label={tag.Name}
                sx={{marginTop: '20px', marginRight: '10px'}}
                size="small"
                variant="outlined"
                onClick={() => {
                  navigate(`/tag/${tag.ID}`)
                }}
              />)
            }
          </Paper>

          {/*<TimeFlies/>*/}
          <section className='aside-footer'>
            <Link
              style={{marginTop: '20px', display: 'block'}}
              to='https://beian.miit.gov.cn/'
              rel="noreferrer"
              target='_blank'
            >
              鄂ICP备2022013786号
            </Link>
            <Link
              style={{marginTop: '20px', display: 'block'}}
              to='https://beian.miit.gov.cn/'
              rel="noreferrer"
              target='_blank'
            >
              鄂ICP备2022013786号-1
            </Link>
            <div style={{marginTop: '20px', display: 'block'}}>© 2024 Saraph1nes Blog</div>
          </section>
        </aside>
      }
    </section>
  </main>)
}

export default Home
