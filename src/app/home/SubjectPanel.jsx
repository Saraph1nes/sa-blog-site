import {Paper, Stack} from "@mui/material";
import {useContext} from "react";
import {DarkModeContent} from "@/components/DarkModeProvider/index.jsx";
import {useNavigate} from "react-router-dom";

const SubjectPanel = () => {
  const ctx = useContext(DarkModeContent);
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
  }

  return <>
    {
      !ctx.isMobile && <div className='special-subject-wrap'>
        <h2 className='special-subject-title'>专题</h2>
        <Stack
          className='special-subject-list'
          direction={ctx.isMobile ? "column" : "row"}
          spacing={3}
        >
          <Paper
            square={false}
            elevation={3}
            className="special-subject-list-item frontend"
            onClick={() => onPaperClick('frontend')}
          >
            <h3 className='special-subject-list-item-title'>前端</h3>
            <img
              className='special-subject-list-item-img'
              src="https://assest.sablogs.cn/imgs/blog/React.png"
              alt=""
            />
          </Paper>
          <Paper square={false} elevation={3} className="special-subject-list-item backend"
                 onClick={() => onPaperClick('backend')}>
            <h3 className='special-subject-list-item-title'>后端</h3>
            <img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/nodejs.png"
                 alt="" />
          </Paper>
          <Paper square={false} elevation={3} className="special-subject-list-item algorithm"
                 onClick={() => onPaperClick('algorithm')}>
            <h3 className='special-subject-list-item-title'>算法</h3>
            <img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/suanfa.png"
                 alt="" />
          </Paper>
        </Stack>
      </div>
    }
  </>
}

export default SubjectPanel
