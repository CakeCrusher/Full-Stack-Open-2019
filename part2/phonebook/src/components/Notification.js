import React from 'react'

const Notification = ({message, type}) => {
    const notificationStyle = {
        color: 'black',
        background: 'lightgray',
        border: 'solid',
        borderRadius: '5px',
        fontSize: '20px',
        padding: '5px',
        margin: '10px'
    }
    if (message === null) {
        return null
    }
    else if (type === 'create') {
        return (
            <div style={{...notificationStyle, color: 'green'}}>
                {message}
            </div>
        )
    }
    else if (type === 'error') {
        return (
            <div style={{...notificationStyle, color: 'red'}}>
                {message}
            </div>
        )
    }
}

export default Notification