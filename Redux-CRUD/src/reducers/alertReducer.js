
const initialState = {
    alert: null
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALERT":
            return {
                ...state,
                alert: action.payload
            };
        case "REMOVE_ALERT":
            return {
                ...state,
                alert: null
            };
        default:
            return state;
    }
}

export default alertReducer;