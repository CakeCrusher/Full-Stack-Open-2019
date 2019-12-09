import usersService from '../services/users'

export const initiateUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

const usersReducer = (state = [], action) => {
    console.log(state)
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
    }
}

export default usersReducer