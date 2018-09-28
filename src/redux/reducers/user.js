

const user = (state = {curCount: "admin"} , action) => {
    switch (action.type) {
        case 'LOGIN':
        return {
            ...state,
            curCount: action.curCount
        }
        default:
            return state;
    }
}

export default user;