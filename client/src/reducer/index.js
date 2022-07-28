const initialState = {
    videogames : []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_CHARACTER":
            return{
                ...state,
                videogames: action.payload
            }
            default: return state
    }
}
export default rootReducer