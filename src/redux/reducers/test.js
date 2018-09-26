

const home = (state = {adList: []} , action) => {
    switch (action.type) {
        case 'CHANGE_ADLIST':
        return {
            ...state,
            adList: action.adList
        }
        default:
            return state;
    }
}

export default home;