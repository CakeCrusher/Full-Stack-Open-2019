import React from 'react'

const Notification = ({text, type}) => {
    const errorStyle = {
        border: 'solid 5px red',
        borderRadius: '5px',
        padding: '5px',
        margin: '0px',
        color: 'red',
        fontWeight: 'bold'
    }
    const passStyle = {
        border: 'solid 5px green',
        borderRadius: '5px',
        padding: '5px',
        margin: '0px',
        color: 'green',
        fontWeight: 'bold'
    }
    const notificationStyle = type === 'error' ? errorStyle : passStyle
    if (text){
        return(
            <div style={notificationStyle}>
                <h2>{text}</h2>
            </div>
        )
    } else {
        return null
    }

}

export default Notification