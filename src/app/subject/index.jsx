import {Paper} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useNavigate} from "react-router-dom";

import './index.scss'

const Subject = () => {
  const navigate = useNavigate();

  const onPaperClick = (type) => {
    if (type === 'frontend') {
      navigate('/book/1')
    }
    if (type === 'backend') {
      navigate('/book/2')
    }
    if (type === 'algorithm') {
      navigate('/book/14')
    }
    if (type === 'designPatterns') {
      navigate('/book/17')
    }
  }

  return <div className='page-subject'>
    <section className='page-subject-section'>
      <h2>技术专题</h2>
      <Grid container spacing={2} className='special-subject-list'>
        <Grid xs={4}>
          <Paper
            square={false}
            className="special-subject-list-item frontend"
            onClick={() => onPaperClick('frontend')}
          >
            <h3 className='special-subject-list-item-title'>前端专题</h3>
            {/*<img*/}
            {/*  className='special-subject-list-item-img'*/}
            {/*  src="https://assest.sablogs.cn/imgs/blog/React.png"*/}
            {/*  alt=""*/}
            {/*/>*/}
          </Paper>
        </Grid>
        <Grid xs={4}>
          <Paper square={false} className="special-subject-list-item backend"
                 onClick={() => onPaperClick('backend')}>
            <h3 className='special-subject-list-item-title'>后端专题</h3>
            {/*<img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/nodejs.png"*/}
            {/*     alt=""/>*/}
          </Paper>
        </Grid>
        <Grid xs={4}>
          <Paper square={false} className="special-subject-list-item algorithm"
                 onClick={() => onPaperClick('algorithm')}>
            <h3 className='special-subject-list-item-title'>算法专题</h3>
            {/*<img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/suanfa.png"*/}
            {/*     alt=""/>*/}
          </Paper>
        </Grid>
        <Grid xs={4}>
          <Paper square={false} className="special-subject-list-item designPatterns"
                 onClick={() => onPaperClick('designPatterns')}>
            <h3 className='special-subject-list-item-title'>设计模式专题</h3>
            {/*<img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/suanfa.png"*/}
            {/*     alt=""/>*/}
          </Paper>
        </Grid>
      </Grid>
    </section>
  </div>
}

export default Subject
