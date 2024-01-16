import PropTypes from "prop-types";

import './index.scss'

const Loading = ({show = false}) => {
  return <>
    <div className='loading-page'>
      <div>
        <div className='loading'/>
      </div>
    </div>
  </>
}

Loading.propTypes = {
  show: PropTypes.bool
}

export default Loading
