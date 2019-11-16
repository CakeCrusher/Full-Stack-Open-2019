import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [childVisible, setChildVisible] = useState(false)
    
    const hideWhileVisible = {display: childVisible ? 'none' : ''}
    const showWhileVisible = {display: childVisible ? '' : 'none'}

    const toggleVisibility = () => {
        setChildVisible(!childVisible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhileVisible}>
                <button onClick={toggleVisibility}>{props.btnLabel}</button>
            </div>
            <div style={showWhileVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Collapse</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    btnLabel: PropTypes.string.isRequired
}

export default Togglable