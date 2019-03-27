import {combineReducers} from 'redux';

import {SET_CRED} from '../action/setcred';

function usercred(state = {} , action){
    switch(action.type){
        case SET_CRED: 
            return {
                token: action.token,
             };
        default:
            return state;
    }
}

const usercredStore = combineReducers({
    usercred
});

export default usercredStore;