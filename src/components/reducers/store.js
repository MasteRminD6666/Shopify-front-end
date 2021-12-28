import { createStore } from 'redux';

const user = localStorage.getItem('user')

const initalState = {
    userToken: null,
    loggedIn:null,
    switcher:null,
}

function appState(state = initalState, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {
                ...state,
                userToken: action.payload
            };
        case 'SET_USER_LOGIN':
            return {
                ...state,
                loggedIn: action.payload
            };
     
        case 'SET_SWITCHER':
            return {
                ...state,
                switcher: action.payload
            };    
            case 'REST':
                return {
                    ...initalState
                };
        }
    
    return state;
}

const store = createStore(appState, initalState)


export default store;