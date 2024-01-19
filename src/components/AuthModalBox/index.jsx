import PropTypes from 'prop-types'
import { useState } from 'react'

const AuthModalBox = ({ children }) => {
    const [show, setShow] = useState(false)

    return <>
        <div
            onClick={() => {
                setShow(true)
            }}
        >
            {children}
        </div>
        <dialog open={show} modal>
            123
        </dialog>
        <div>
            123
        </div>
    </>
}

AuthModalBox.propTypes = {
    children: PropTypes.node
}

export default AuthModalBox