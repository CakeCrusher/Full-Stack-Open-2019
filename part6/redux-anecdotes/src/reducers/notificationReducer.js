export const setNotification = (notification, sec) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE_NOTIFICATION',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'CHANGE_NOTIFICATION',
                notification: null
            })
        }, sec * 1000)

    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type){
        case 'CHANGE_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export default notificationReducer
