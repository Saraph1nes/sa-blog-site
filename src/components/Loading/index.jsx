import PropTypes from "prop-types";

import './index.scss'

const Loading = () => {
  return <div
    onClick={e => {
      e.stopPropagation()
      e.preventDefault()
    }}
    className='loading-page'
  >
    <div className='loading' />
  </div>
}

Loading.propTypes = {
  show: PropTypes.bool
}

export default Loading
