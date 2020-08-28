const INITIAL_STATE = {
    currentUser: null,
}

// state is the current/previous object that the redux store will pass to this reducer, when action fires
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER':
            // if the type is SET_CURRENT_USER, then return a new object, which represents a new state
            return {
                ...state, // we only want to modify currentUser value and save other prop values, so we can spread ...state 
                currentUser: action.payload
            };

        default:
            // every reducer will get every single action that gets fired, even if the action is not related to this reducer. In that case just return the same state
            return state; 
    }
};

export default userReducer;