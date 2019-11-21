export const changeFilter = event => {
    return ({
        type: 'CHANGE_FILTER',
        filterText: event.target.value
    })
}

const filterReducer = (state = '', action) => {
    switch (action.type){
        case 'CHANGE_FILTER':
            return action.filterText
        default:
            return state
    }
}

export default filterReducer