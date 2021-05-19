import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility'

const initialState = {
    details:null
};

const login = (state, action) => {
    return updatedObject(state, {
        details:action.data
    })
};


const loginDetails = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.LOGIN : return login(state, action);
        default: return state
    }
}

export default  loginDetails